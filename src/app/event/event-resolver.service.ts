import { Observable } from "rxjs";
import {
    catchError,
    map
} from "rxjs/operators";

import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from "@angular/router";

import {
    Event,
    EventsService
} from "@obs-dev/traverse-web-api";

@Injectable()
export class EventResolver implements Resolve<Event> {
    constructor(
        private eventsService: EventsService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.eventsService.getById(route.params["id"]).pipe(
            map(event => event),
            catchError((err) => this.router.navigateByUrl("/events"))
        );
    }
}
