import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TraverseWebApiModule } from '@obs-dev/traverse-web-api';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import {
    DriverDetailModalComponent,
    GreeterDetailModalComponent,
    GroupDetailModalComponent,
    LocationDetailModalComponent,
    RunStatusModalComponent,
    RunsDatepickerModalComponent,
    VehicleDetailModalComponent,
    WebViewModalComponent
} from './modals';

@NgModule({
    declarations: [
        DriverDetailModalComponent,
        GreeterDetailModalComponent,
        GroupDetailModalComponent,
        LocationDetailModalComponent,
        RunStatusModalComponent,
        RunsDatepickerModalComponent,
        VehicleDetailModalComponent,
        WebViewModalComponent
    ],
    imports: [
        TraverseWebApiModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUIListViewModule,
        ReactiveFormsModule
    ],
    exports: [
        TraverseWebApiModule,
        DriverDetailModalComponent,
        GreeterDetailModalComponent,
        GroupDetailModalComponent,
        LocationDetailModalComponent,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUIListViewModule,
        ReactiveFormsModule,
        RunStatusModalComponent,
        RunsDatepickerModalComponent,
        VehicleDetailModalComponent,
        WebViewModalComponent
    ],
    entryComponents: [
        DriverDetailModalComponent,
        GreeterDetailModalComponent,
        GroupDetailModalComponent,
        LocationDetailModalComponent,
        RunStatusModalComponent,
        RunsDatepickerModalComponent,
        VehicleDetailModalComponent,
        WebViewModalComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
