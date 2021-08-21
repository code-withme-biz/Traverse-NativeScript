import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { EventComponent } from "./event/event.component";
import { EventResolver } from "./event/event-resolver.service";
import { EventsComponent } from "./events/events.component";
import { RunsComponent } from "./runs/runs.component";
import { RunDetailComponent } from "./runs/run-detail.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";

import { DriversComponent } from "./drivers/drivers.component";
import { RunResolver } from "./runs/run-resolver.service";

import { AuthGuard } from "./shared";

const routes: Routes = [
    { path: "", redirectTo: "/auth", pathMatch: "full" },
    { path: "auth", component: AuthComponent },
    { path: "drivers", component: DriversComponent },
    {
        path: "event/:id",
        component: EventComponent,
        canActivate: [AuthGuard],
        resolve: {
            event: EventResolver
        }
    },
    {
        path: "events",
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "runs",
        component: RunsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "event/:id/runs",
        component: RunsComponent,
        canActivate: [AuthGuard],
        resolve: {
            event: EventResolver
        }
    },
    {
        path: "run/:id",
        component: RunDetailComponent,
        canActivate: [AuthGuard],
        resolve: {
            run: RunResolver
        }
    },
    {
        path: "user-settings",
        component: UserSettingsComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [
        EventResolver,
        RunResolver
    ]
})
export class AppRoutingModule { }
