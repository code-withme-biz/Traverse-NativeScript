import {
    Component,
    OnInit
} from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";

import {
    Run,
    RunsService
} from "@obs-dev/traverse-web-api";

@Component({
    selector: "ns-app-run-status-modal",
    templateUrl: "./run-status-modal.component.html"
})
export class RunStatusModalComponent implements OnInit {
    public run = new Run;
    public webViewSrc = '';

    constructor(
        private params: ModalDialogParams,
        private runsService: RunsService
    ) { }

    ngOnInit(): void {
        this.runsService.getById(this.params.context.id).subscribe(runRes => {
            this.run = runRes;
        });
    }

    public onClose(): void {
        this.params.closeCallback();
    }

    setRunStatus(status: string) {
        this.run.status = status;
        this.runsService.update(this.run).subscribe(res => {
            this.params.closeCallback(this.run.status);
        });
    }

}
