import { Component, OnInit } from "@angular/core";

import * as utils from "tns-core-modules/utils/utils";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import { Greeter, GreetersService } from "@obs-dev/traverse-web-api";

import * as TNSPhone from 'nativescript-phone';

@Component({
    selector: "ns-app-greeter-detail-modal",
    templateUrl: "./greeter-detail-modal.component.html"
})
export class GreeterDetailModalComponent implements OnInit {
    public webViewSrc = "";
    public greeter = new Greeter();

    constructor(
        private greetersService: GreetersService,
        private params: ModalDialogParams
    ) {}

    ngOnInit(): void {
        this.greetersService
            .getById(this.params.context.id)
            .subscribe(greeterRes => {
                this.greeter = greeterRes;
            });
    }

    public onClose(): void {
        this.params.closeCallback();
    }

    onPhoneCallTap(phoneNumber: string) {
        phoneNumber = phoneNumber.split(" ").join("-");
        TNSPhone.dial(phoneNumber, true);
    }

    onPhoneSmsTap(phoneNumber: string) {
        phoneNumber = phoneNumber.split(" ").join("-");
        utils.openUrl(`sms:${phoneNumber}`);
    }
}
