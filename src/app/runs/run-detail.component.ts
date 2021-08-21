import {
    Component,
    OnInit,
    ViewContainerRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {
    ModalDialogOptions,
    ModalDialogService
} from 'nativescript-angular/directives/dialogs';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import * as moment from "moment-timezone";

import {
    DriversService,
    Event,
    EventsService,
    FileAttachment,
    GreetersService,
    GroupsService,
    LocationsService,
    RunsService,
    VehiclesService
} from "@obs-dev/traverse-web-api";

import {
    DriverDetailModalComponent,
    GreeterDetailModalComponent,
    GroupDetailModalComponent,
    LocationDetailModalComponent,
    RunStatusModalComponent,
    VehicleDetailModalComponent,
    WebViewModalComponent
} from "../shared";

@Component({
    selector: "ns-app-run-details",
    templateUrl: "./run-detail.component.html"
})
export class RunDetailComponent implements OnInit {
    currentEvent: Event;
    extendedView = false;
    processing = true;
    run: any;
    showScheduledEnd = false;

    constructor(
        private driversService: DriversService,
        private eventsService: EventsService,
        private greetersService: GreetersService,
        private groupsService: GroupsService,
        private locationsService: LocationsService,
        private modalService: ModalDialogService,
        private route: ActivatedRoute,
        private runsService: RunsService,
        private vcRef: ViewContainerRef,
        private vehiclesService: VehiclesService
    ) { }

    ngOnInit() {
        this.eventsService.currentEvent.subscribe(eventData => {
            this.currentEvent = eventData;
        });
        this.route.data.subscribe(runData => {
            this.run = runData.run;
            this.populateRun();
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onRefreshInitiated() {
        this.populateRun();
    }

    populateRun() {
        this.processing = true
        this.runsService.getById(this.run.id).subscribe(runRes => {
            this.run = runRes;
            if (this.run.sourceLocationId) {
                this.locationsService.getById(this.run.sourceLocationId).subscribe(sourceLocationRes => {
                    this.run.sourceLocationExtended = sourceLocationRes;
                    this.run.sourceLocationName = sourceLocationRes.displayName;
                });
            } else {
                this.run.sourceLocationName = '[unset]';
            }
            if (this.run.destinationLocationId) {
                this.locationsService.getById(this.run.destinationLocationId).subscribe(destinationLocationRes => {
                    this.run.destinationLocationExtended = destinationLocationRes;
                    this.run.destinationLocationName = destinationLocationRes.displayName;
                });
            } else {
                this.run.destinationLocationName = '[unset]';
            }
            if (!this.run.driverId) {
                this.run.driverName = '[unset]';
            } else {
                this.driversService.getById(this.run.driverId).subscribe(driverRes => {
                    this.run.driverName = driverRes.displayName;
                });
            }
            if (!this.run.greeterId) {
                this.run.greeterName = '[unset]';
            } else {
                this.greetersService.getById(this.run.greeterId).subscribe(greeterRes => {
                    this.run.greeterName = greeterRes.displayName;
                });
            }
            if (!this.run.groupId) {
                this.run.groupName = '[unset]';
            } else {
                this.groupsService.getById(this.run.groupId).subscribe(groupRes => {
                    this.run.groupName = groupRes.displayName;
                })
            }
            if (!this.run.primaryContactId) {
                this.run.primaryContactName = '[unset]';
            } else {
                this.groupsService.getContactById(this.run.groupId, this.run.primaryContactId).subscribe(contactRes => {
                    this.run.primaryContactName = contactRes.firstName + ' ' + contactRes.lastName;
                });
            }
            if (!this.run.vehicleId) {
                this.run.vehicleName = '[unset]';
            } else {
                this.vehiclesService.getById(this.run.vehicleId).subscribe(vehicleRes => {
                    this.run.vehicleName = vehicleRes.displayName;
                });
            }
            if (!this.run.vehicleType) {
                this.run.vehicleTypeName = '[unset]';
            } else {
                this.vehiclesService.getTypeById(this.run.vehicleType).subscribe(vehicleTypeRes => {
                    this.run.vehicleTypeName = vehicleTypeRes.displayName;
                });
            }
            if (this.run.fileAttachments) {
                this.run.fileAttachments.forEach(attachment => {
                    attachment.displayName = attachment.name.substring(attachment.name.lastIndexOf('/') + 1);
                });
            }

            const start = moment(this.run.scheduledStart);
            const end = moment(this.run.scheduledEnd);
            const duration = moment.duration(end.diff(start));
            const minutes = duration.asMinutes();
            const hours = duration.asHours();
            console.log(hours);
            if (minutes < 60) {
                this.run.duration = minutes + ' minutes allotted';
            } else if (minutes === 60) {
                this.run.duration = '1 hour allotted';
            } else if (minutes % 60 === 0) {
                this.run.duration = hours + ' hours allotted';
            } else {
                this.run.duration = Math.floor(hours) + ' hours ' + (minutes % 60) + ' minutes allotted';
            }
            this.processing = false;
        });
    }

    openFlightNumber(flightNumber: string) {
        const flightAwareLink = encodeURI(String("https://flightaware.com/live/flight/" + flightNumber));
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { title: `Flight: ${flightNumber}`, url: flightAwareLink, restrictedView: false, run: this.run },
            fullscreen: true
        };
        this.modalService.showModal(WebViewModalComponent, options).then(res => {
        });
    }

    openRunFileAttachment(attachment: FileAttachment): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { title: 'Run File Attachment', url: attachment.name, restrictedView: false, run: this.run },
            fullscreen: true
        };
        this.modalService.showModal(WebViewModalComponent, options).then(res => {
            // Do nothing
        });
    }

    openModal(type: string) {
        if (type === 'driver') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.driverId, run: this.run },
                fullscreen: true
            };
            this.modalService.showModal(DriverDetailModalComponent, options).then(res => {
                // Do nothing
            });
        } else if (type === 'dropoff-location') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.destinationLocationId, run: this.run, type: type },
                fullscreen: true
            };
            this.modalService.showModal(LocationDetailModalComponent, options).then(res => {
                // Do nothing
            });
        } else if (type === 'greeter') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.greeterId, run: this.run },
                fullscreen: true
            };
            this.modalService.showModal(GreeterDetailModalComponent, options).then(res => {
                // Do nothing
            });
        } else if (type === 'group') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.groupId, run: this.run },
                fullscreen: true
            };
            this.modalService.showModal(GroupDetailModalComponent, options).then(res => {
                // Do nothing
            });
        } else if (type === 'pickup-location') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.sourceLocationId, run: this.run, type: type },
                fullscreen: true
            };
            this.modalService.showModal(LocationDetailModalComponent, options).then(res => {
                // Do nothing
            });
        } else if (type === 'run-status') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.id, run: this.run },
                fullscreen: true
            };
            this.modalService.showModal(RunStatusModalComponent, options).then(runStatusRes => {
                if (runStatusRes) {
                    this.run.status = runStatusRes;
                }
            });
        } else if (type === 'vehicle') {
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: { id: this.run.vehicleId, restrictedView: false, run: this.run },
                fullscreen: true
            };
            this.modalService.showModal(VehicleDetailModalComponent, options).then(res => {
                // Do nothing
            });
        }
    }
}
