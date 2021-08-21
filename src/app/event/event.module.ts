import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { EventComponent } from "./event.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [SharedModule],
    declarations: [EventComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EventModule { }
