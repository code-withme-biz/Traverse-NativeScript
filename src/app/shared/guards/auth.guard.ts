import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { UserService } from "@obs-dev/traverse-web-api";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userService.authenticated) {
            this.router.navigate(["/login"], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
        return true;
    }
}
