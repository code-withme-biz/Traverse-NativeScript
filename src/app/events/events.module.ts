import {
    NO_ERRORS_SCHEMA,
    NgModule
} from "@angular/core";

import { EventsComponent } from "./events.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EventsComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EventsModule { }
