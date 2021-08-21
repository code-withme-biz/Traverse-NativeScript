import {
    Component,
    OnInit
} from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";


@Component({
    selector: "ns-app-web-view-modal",
    templateUrl: "./web-view-modal.component.html"
})
export class WebViewModalComponent implements OnInit {
    public title = "";
    public webViewSrc = "";

    constructor(
        private params: ModalDialogParams
    ) {

    }

    ngOnInit(): void {
        this.title = this.params.context.title;
        this.webViewSrc = this.params.context.url;
    }


    onLoadStarted(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Start");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    onLoadFinished(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Finished");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    public onClose(): void {
        this.params.closeCallback();
    }
}
