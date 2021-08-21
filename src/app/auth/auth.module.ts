import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AuthComponent } from "./auth.component";

import { SharedModule } from "../shared/shared.module";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

@NgModule({
    declarations: [AuthComponent],
    imports: [SharedModule, TNSCheckBoxModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
