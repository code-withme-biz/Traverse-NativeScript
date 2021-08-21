import {
    NO_ERRORS_SCHEMA,
    NgModule
} from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DriversComponent } from "./drivers.component";


@NgModule({
    declarations: [DriversComponent],
    imports: [SharedModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DriversModule { }
