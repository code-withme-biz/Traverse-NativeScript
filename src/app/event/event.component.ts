import {
    Component,
    OnInit
} from "@angular/core";
import {
    ActivatedRoute,
    Router
} from "@angular/router";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Event } from "@obs-dev/traverse-web-api";

@Component({
    selector: "ns-app-event",
    templateUrl: "./event.component.html"
})
export class EventComponent implements OnInit {
    event: Event;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.data.subscribe(eventData => {
            this.event = eventData.event;
            if (!this.event.description) {
                this.event.description = '[none]';
            }
        });
    }

    goToRuns() {
        this.router.navigateByUrl("/runs");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
