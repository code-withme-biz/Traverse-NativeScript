import { Component, OnInit, ViewContainerRef } from "@angular/core";

import * as utils from "tns-core-modules/utils/utils";

import {
    ModalDialogOptions,
    ModalDialogParams,
    ModalDialogService
} from "nativescript-angular/modal-dialog";

import {
    Driver,
    DriversService,
    VehiclesService,
    UserService,
    EventsService,
    Event
} from "@obs-dev/traverse-web-api";

import { VehicleDetailModalComponent } from "./vehicle-detail-modal.component";

import * as TNSPhone from 'nativescript-phone';

@Component({
    selector: "ns-app-driver-detail-modal",
    templateUrl: "./driver-detail-modal.component.html"
})
export class DriverDetailModalComponent implements OnInit {
    public currentEvent: Event;
    public driver = new Driver();
    public webViewSrc = "";

    constructor(
        private driversService: DriversService,
        private eventsService: EventsService,
        private modalService: ModalDialogService,
        private params: ModalDialogParams,
        private userService: UserService,
        private vcRef: ViewContainerRef,
        private vehiclesService: VehiclesService
    ) {}

    ngOnInit(): void {
        this.eventsService.currentEvent.subscribe(eventData => {
            this.currentEvent = eventData;
        });
        this.driversService
            .getById(this.params.context.id)
            .subscribe(driverRes => {
                this.driver = driverRes;
                this.driver.vehicles = [];
                this.driver.vehicleId.forEach(driverVehicleId => {
                    this.vehiclesService
                        .getById(driverVehicleId)
                        .subscribe(vehicleRes => {
                            this.driver.vehicles.push(vehicleRes);
                        });
                });
            });
    }

    public onClose(): void {
        this.params.closeCallback();
    }

    public onPhoneCallTap(phoneNumber: string) {
        phoneNumber = phoneNumber.split(" ").join("-");
        TNSPhone.dial(phoneNumber, true);
    }

    public onPhoneSmsTap(phoneNumber: string) {
        phoneNumber = phoneNumber.split(" ").join("-");
        utils.openUrl(`sms:${phoneNumber}`);
    }

    onVehicleTap(vehicleId: string) {
        this.userService
            .getCurrentUserDriverId(this.currentEvent.id)
            .subscribe(currentUserDriverIdRes => {
                let restrictedVehicleView = true;
                if (currentUserDriverIdRes === this.driver.id) {
                    restrictedVehicleView = false;
                }
                const options: ModalDialogOptions = {
                    viewContainerRef: this.vcRef,
                    context: {
                        id: vehicleId,
                        restrictedView: restrictedVehicleView
                    },
                    fullscreen: true
                };
                this.modalService
                    .showModal(VehicleDetailModalComponent, options)
                    .then(res => {
                        // Do nothing
                    });
            });
    }
}
