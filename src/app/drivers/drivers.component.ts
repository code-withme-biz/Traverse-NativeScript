import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from "@angular/core";

import {
    ModalDialogOptions,
    ModalDialogService
} from "nativescript-angular/modal-dialog";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {
    Driver,
    DriversService,
    Event,
    EventsService,
    Vehicle,
    VehiclesService
} from "@obs-dev/traverse-web-api";

import { DriverDetailModalComponent } from "../shared";

@Component({
    selector: "ns-app-drivers",
    templateUrl: "./drivers.component.html"
})
export class DriversComponent implements OnInit {
    currentEvent: Event;
    drivers: ObservableArray<Driver>;
    processing = false;

    @ViewChild("driverListView", { read: RadListViewComponent, static: false }) driverListViewComponent: RadListViewComponent;
    constructor(
        private driversService: DriversService,
        private eventsService: EventsService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private vehiclesService: VehiclesService
    ) { }

    ngOnInit() {
        this.eventsService.currentEvent.subscribe(eventData => {
            this.currentEvent = eventData;
            if (this.currentEvent.id) {
                this.populateDrivers();
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onPullToRefreshInitiated(args: any) {
        this.driversService.getAllPaginated(0, 12000).subscribe(driversRes => {
            this.drivers = new ObservableArray(driversRes.content);
            this.drivers.forEach(driver => {
                driver.vehicles = [];
                const unsetVehicle = new Vehicle;
                unsetVehicle.displayName = '[no vehicle set]';
                driver.vehicles.push(unsetVehicle);
                if (driver.vehicleId !== undefined && driver.vehicleId.length !== 0) {
                    this.vehiclesService.getById(driver.vehicleId[0]).subscribe(vehicle => {
                        driver.vehicles[0] = vehicle;
                    });
                }
            });
            args.object.notifyPullToRefreshFinished();
        });
    }

    populateDrivers() {
        this.processing = true;
        this.driversService.getAllPaginated(0, 12000).subscribe(driversRes => {
            this.drivers = new ObservableArray(driversRes.content);
            this.drivers.forEach(driver => {
                driver.vehicles = [];
                const unsetVehicle = new Vehicle;
                unsetVehicle.displayName = '[no vehicle set]';
                driver.vehicles.push(unsetVehicle);
                if (driver.vehicleId !== undefined && driver.vehicleId.length !== 0) {
                    this.vehiclesService.getById(driver.vehicleId[0]).subscribe(vehicle => {
                        driver.vehicles[0] = vehicle;
                    });
                }
            });
            this.processing = false;
        });
    }

    selectDriver(driverId: string) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { id: driverId },
            fullscreen: true
        };
        this.modalService.showModal(DriverDetailModalComponent, options).then(res => {
            // Do nothing
        });
    }
}
