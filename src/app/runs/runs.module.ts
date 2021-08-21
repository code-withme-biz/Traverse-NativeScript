import {
    NO_ERRORS_SCHEMA,
    NgModule
} from "@angular/core";

import { RunsComponent } from "./runs.component";
import { RunDetailComponent } from "./run-detail.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RunDetailComponent,
        RunsComponent
    ],
    imports: [SharedModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class RunsModule { }
