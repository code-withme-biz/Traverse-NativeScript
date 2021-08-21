import {
    Component,
    OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {
    Event,
    EventsService
} from "@obs-dev/traverse-web-api";

@Component({
    selector: "ns-app-events-page",
    templateUrl: "./events.component.html"
})
export class EventsComponent implements OnInit {
    events: Event[];

    constructor(
        private eventsService: EventsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.populateEvents();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    populateEvents() {
        this.eventsService.getAll().subscribe(events => {
            this.events = events;
        });
    }

    selectEvent(id) {
        this.router.navigateByUrl(`/event/${id}/runs`);
    }
}
