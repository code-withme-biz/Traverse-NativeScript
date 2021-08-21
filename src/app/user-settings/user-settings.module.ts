import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { UserSettingsComponent } from "./user-settings.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [SharedModule],
    declarations: [UserSettingsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserSettingsModule { }
