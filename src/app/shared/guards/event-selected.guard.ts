import { take } from "rxjs/operators";
import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { EventsService } from "@obs-dev/traverse-web-api";

@Injectable()
export class EventSelectedGuard implements CanActivate {
    constructor(
        private eventsService: EventsService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.eventsService.isEventSelected.pipe(take(1));
    }
}
