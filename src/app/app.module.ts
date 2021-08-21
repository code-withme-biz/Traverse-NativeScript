import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { TraverseWebApiModule, TimezonedDatePipe } from '@obs-dev/traverse-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { EventModule } from './event/event.module';
import { EventsModule } from './events/events.module';
import { RunsModule } from './runs/runs.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

import { AuthGuard, EventSelectedGuard, NoAuthGuard } from './shared';
import { environment } from '../environments/environment';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        AuthModule,
        DriversModule,
        EventModule,
        EventsModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgxWebstorageModule.forRoot(),
        RunsModule,
        TraverseWebApiModule.forRoot({
            auth_url: environment.auth_url,
            api_url: environment.api_url,
            signing_key: environment.signing_key
        }),

        UserSettingsModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, EventSelectedGuard, NoAuthGuard, TimezonedDatePipe],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
