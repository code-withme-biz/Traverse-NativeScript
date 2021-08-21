import {
    Component,
    OnInit
} from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";

@Component({
    selector: "ns-app-runs-datepicker-modal",
    templateUrl: "./runs-datepicker-modal.component.html"
})
export class RunsDatepickerModalComponent implements OnInit {
    initDate: string;
    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2045, 4, 12);
    selectedDate: Date;

    constructor(
        private params: ModalDialogParams
    ) { }

    ngOnInit() { }

    filterRuns(): void {
        this.params.closeCallback(this.selectedDate);
    }

    public onCancel(): void {
        this.params.closeCallback();
    }

    public onClose(): void {
        this.params.closeCallback();
    }

    onDatePickerLoaded(args) {
        const datePicker = args.object as DatePicker;
        datePicker.date = this.params.context.initDate ? this.params.context.initDate : new Date;
    }

    onDateChanged(args) {
        this.selectedDate = args.value;
    }
}
