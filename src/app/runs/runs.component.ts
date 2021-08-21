import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array"
import { Router } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as moment from "moment-timezone";

import {
  Event,
  EventsService,
  RunListDetail,
  RunsService,
  UserService,
  RostersService,
  Roster,
  TimezonedDatePipe
} from "@obs-dev/traverse-web-api";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import {
  ModalDialogOptions,
  ModalDialogService
} from "nativescript-angular/modal-dialog";
import { RunsDatepickerModalComponent } from "../shared";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: "ns-app-runs",
  templateUrl: "./runs.component.html"
})
export class RunsComponent implements OnInit {
  private _dailyFilter: (item: any) => any;
  currentEvent: Event;
  dateFilterLabel: string;
  filterDate = null;
  isEnabled = false;
  processing = false;
  runs: ObservableArray<RunListDetail>;
  timezone: string;
  today = new Date();

  @ViewChild("runListView", { read: RadListViewComponent, static: false }) runListViewComponent: RadListViewComponent;
  driverId: any;
  currentDayRosters: Array<Roster> = [];

  constructor(
    private eventsService: EventsService,
    private modalService: ModalDialogService,
    private router: Router,
    private runsService: RunsService,
    private rosterService: RostersService,
    private userService: UserService,
    private vcRef: ViewContainerRef,
    private timezonedDatePipe: TimezonedDatePipe
  ) {
    this.timezone = this.eventsService.getCurrentEventTimezone();


  }


  ngOnInit() {
    this.eventsService.currentEvent.subscribe(eventData => {
      this.currentEvent = eventData;
      if (this.currentEvent.id) {
        this.populateRuns();
        this.userService.getCurrentUserDriverId(this.currentEvent.id).subscribe(this.determineCurrentDayRosters());
      }
    });
  }

  get dailyFilter(): (item: any) => any {
    return this._dailyFilter;
  }

  set dailyFilter(value: (item: any) => any) {
    this._dailyFilter = value;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  public onPullToRefreshInitiated(args: any) {
    this.userService.getCurrentUserDriverId(this.currentEvent.id).subscribe(this.determineCurrentDayRosters());
    this.runsService.getAllPaginated(0, 12000, true).subscribe(runsRes => {
      this.runs = new ObservableArray(runsRes.content);
      this.runs.sort((run1, run2) => (run1.scheduledStart < run2.scheduledStart) ? -1 : (run1.scheduledEnd > run2.scheduledStart) ? 1 : 0);
      if (this.filterDate) {
        this.dailyFilter = (item: RunListDetail) => {
          return item && (moment.parseZone(item.scheduledStart).tz(this.timezone).isSame(this.filterDate, 'day'));
        };
        let listView = this.runListViewComponent.listView;
        listView.filteringFunction = this.dailyFilter;
        this.dateFilterLabel = moment(this.filterDate).format("ddd, MM/DD/YYYY");
      }
      args.object.notifyPullToRefreshFinished();
    });
  }

  openRunsDatepicker() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        initDate: this.filterDate
      },
      fullscreen: true
    };
    this.modalService.showModal(RunsDatepickerModalComponent, options).then(runsDatepickerRes => {

      if (runsDatepickerRes) {
        this.filterDate = moment.parseZone(runsDatepickerRes).tz(this.timezone).format();
        this.userService.getCurrentUserDriverId(this.currentEvent.id).subscribe(this.determineCurrentDayRosters());
        this.dailyFilter = (item: RunListDetail) => {
          return item && (moment.parseZone(item.scheduledStart).tz(this.timezone).isSame(this.filterDate, 'day'));
        };
        let listView = this.runListViewComponent.listView;
        listView.filteringFunction = this.dailyFilter;
        this.dateFilterLabel = moment(this.filterDate).format("ddd, MM/DD/YYYY");

      }
    });
  }

  populateRuns() {
    this.processing = true;
    this.runsService.getAllPaginated(0, 12000, true).subscribe(runsRes => {
      this.runs = new ObservableArray(runsRes.content);
      this.runs.sort((run1, run2) => (run1.scheduledStart < run2.scheduledStart) ? -1 : (run1.scheduledEnd > run2.scheduledStart) ? 1 : 0);
      this.filterDate = moment.parseZone(new Date).tz(this.timezone).format();
      this.dailyFilter = (item: RunListDetail) => {
        return item && (moment.parseZone(item.scheduledStart).tz(this.timezone).isSame(this.filterDate, 'day'));
      };
      let listView = this.runListViewComponent.listView;
      listView.filteringFunction = this.dailyFilter;
      this.dateFilterLabel = moment(this.filterDate).format("ddd, MM/DD/YYYY");
      this.processing = false;
    });
  }

  selectRun(runId) {
    this.router.navigateByUrl("/run/" + runId);
  }



  clearDateFilter() {
    this.dateFilterLabel = 'All Dates';
    this.filterDate = null;
    let listView = this.runListViewComponent.listView;
    listView.filteringFunction = undefined;
    this.userService.getCurrentUserDriverId(this.currentEvent.id).subscribe(this.determineCurrentDayRosters());
  }

  showRosterDialog() {
    if (this.currentDayRosters.length > 1) {
      let rosterMessage: string = "";
      this.currentDayRosters.forEach(roster => {
        rosterMessage += `${this.timezonedDatePipe.transform(roster.scheduledStart, 'hh:mm A')} - ${this.timezonedDatePipe.transform(roster.scheduledEnd, 'hh:mm A')}\n\n`
      });
      dialogs.alert({
        title: "Today's Roster",
        message: rosterMessage,
        okButtonText: "Close"
      });
    }
  }

  private determineCurrentDayRosters() {
    this.currentDayRosters = [];

    return driverId => {
      if (driverId) {

        this.rosterService.getAll().subscribe(rosters => {
          rosters.forEach(roster => {
            if (roster.driverId === driverId && this.filterDate) {
              const isRosterForFilteredDate = moment.parseZone(roster.scheduledStart).tz(this.timezone).isSame(this.filterDate, 'day');
              if (isRosterForFilteredDate) {
                this.currentDayRosters.push(roster)
              }
            }
          });

        });
      }
    };
  }

}
