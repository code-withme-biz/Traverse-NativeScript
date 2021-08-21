import { Component, OnInit } from "@angular/core";

import * as utils from "tns-core-modules/utils/utils";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import {
    Contact,
    Group,
    GroupsService,
    RunExtended
} from "@obs-dev/traverse-web-api";

import * as TNSPhone from 'nativescript-phone';

@Component({
    selector: "ns-app-group-detail-modal",
    templateUrl: "./group-detail-modal.component.html"
})
export class GroupDetailModalComponent implements OnInit {
    public contacts = new Array<Contact>();
    public group = new Group();
    public primaryContact = new Contact();
    public run = new RunExtended();
    public webViewSrc = "";

    constructor(
        private groupsService: GroupsService,
        private params: ModalDialogParams
    ) {}

    ngOnInit(): void {
        this.run = this.params.context.run;
        this.groupsService
            .getById(this.params.context.id)
            .subscribe(groupRes => {
                this.group = groupRes;
                this.groupsService
                    .getContactById(this.group.id, this.run.primaryContactId)
                    .subscribe(runPrimaryContactRes => {
                        this.primaryContact = runPrimaryContactRes;
                    });
                this.run.contacts.forEach(runContactId => {
                    if (runContactId !== this.run.primaryContactId) {
                        this.groupsService
                            .getContactById(this.group.id, runContactId)
                            .subscribe(runContactRes => {
                                this.contacts.push(runContactRes);
                            });
                    }
                });
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
