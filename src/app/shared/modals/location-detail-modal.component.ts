import {
    Component,
    OnInit
} from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import {
    Location,
    LocationsService
} from "@obs-dev/traverse-web-api";

@Component({
    selector: "ns-app-location-detail-modal",
    templateUrl: "./location-detail-modal.component.html"
})
export class LocationDetailModalComponent implements OnInit {
    public location = new Location;
    public title = 'Location';
    public webViewSrc = '';

    constructor(
        private locationsService: LocationsService,
        private params: ModalDialogParams
    ) { }

    ngOnInit(): void {
        if (this.params.context.type === 'pickup-location') {
            this.title = 'Pick Up Location';
        } else if (this.params.context.type === 'dropoff-location') {
            this.title = 'Drop Off Location';
        }
        this.locationsService.getById(this.params.context.id).subscribe(locationRes => {
            this.location = locationRes;
        });
    }

    public onClose(): void {
        this.params.closeCallback();
    }
}
