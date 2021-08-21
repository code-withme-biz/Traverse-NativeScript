import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators
} from "@angular/forms";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {
    User,
    UserService,
    UsersService
} from "@obs-dev/traverse-web-api";


@Component({
    selector: "ns-app-user-settings",
    templateUrl: "./user-settings.component.html"
})
export class UserSettingsComponent implements OnInit {
    changePasswordForm: FormGroup;
    changePasswordError = null;
    changePasswordSuccess = false;
    processing = false;
    showPasswordForm = false;
    user: User;
    @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private usersService: UsersService
    ) {
        this.changePasswordForm = this.fb.group({
            "password": ["", Validators.required],
            "confirmPassword": ["", Validators.required]
        });
    }

    ngOnInit() {
        this.user = this.userService.getCurrentUser();
    }

    get passwordsMatch(): boolean {
        return this.changePasswordForm.get('confirmPassword').value === this.changePasswordForm.get('password').value;
    }

    focusConfirmPassword() {
        this.confirmPassword.nativeElement.focus();
    }

    onChangePasswordTap() {
        this.processing = true;
        this.changePasswordError = null;
        this.user.password = this.changePasswordForm.get('password').value;
        this.usersService.update(this.user).subscribe(() => {
            this.processing = false;
            this.changePasswordSuccess = true;
        }, (err) => {
            this.processing = false;
            this.changePasswordError = `Couldn't update your password: '${err.message}'`;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
