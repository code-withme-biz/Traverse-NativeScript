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
    Run,
    RunsService
} from "@obs-dev/traverse-web-api";

@Injectable()
export class RunResolver implements Resolve<Run> {
    constructor(
        private runsService: RunsService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.runsService.getById(route.params["id"]).pipe(
            map(run => run),
            catchError((err) => this.router.navigateByUrl("/runs"))
        );
    }
}
