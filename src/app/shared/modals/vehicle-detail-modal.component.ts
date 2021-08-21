import {
    Component,
    OnInit
} from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import {
    Vehicle,
    VehiclesService
} from "@obs-dev/traverse-web-api";

@Component({
    selector: "ns-app-vehicle-detail-modal",
    templateUrl: "./vehicle-detail-modal.component.html"
})
export class VehicleDetailModalComponent implements OnInit {
    public restrictedView = true;
    public vehicle = new Vehicle;
    public vehicleImages = [];
    public webViewSrc = '';

    constructor(
        private params: ModalDialogParams,
        private vehiclesService: VehiclesService
    ) {
        this.restrictedView = this.params.context.restrictedView;
        this.vehicle.customFields = {
            rentalNumber: '',
            fuelLevel: '',
            condition: ''
        };
    }

    ngOnInit(): void {
        this.vehiclesService.getById(this.params.context.id).subscribe(vehicleRes => {
            this.vehicle = vehicleRes;
            if (this.vehicle.images !== undefined && this.vehicle.images !== null) {
                this.vehicleImages = this.vehicle.images;
            }
            this.vehiclesService.getTypeById(this.vehicle.vehicleType).subscribe(vehicleTypeRes => {
                this.vehicle.vehicleTypeName = vehicleTypeRes.displayName;
            });
        });
    }

    get vehicleCondition(): string {
        if (this.vehicle.customFields.condition == undefined) {
            return '';
        } else {
            return this.vehicle.customFields.condition;
        }
    }

    get vehicleFuelLevel(): string {
        if (this.vehicle.customFields.fuelLevel == undefined) {
            return '';
        } else {
            return this.vehicle.customFields.fuelLevel;
        }
    }

    public onClose(): void {
        this.params.closeCallback();
    }
}
