import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

import {
  alert,
  prompt
} from "tns-core-modules/ui/dialogs";

import {
  UserService,
  UsersService
} from "@obs-dev/traverse-web-api";
import { Page } from "tns-core-modules/ui/page/page";
import { Vibrate } from 'nativescript-vibrate';

@Component({
  selector: "ns-app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {

  @ViewChild('rememberMeCheckBox', { static: false }) rememberMeCheckbox: ElementRef;

  rememberMe = true;
  authError = null;
  authForm: FormGroup;
  processing = false;
  vibrator = new Vibrate();
  @ViewChild("password", { static: false }) password: ElementRef;

  constructor(
    private _page: Page,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private usersService: UsersService
  ) {
    this._page.actionBarHidden = true;
    this.authForm = this.fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }

  public toggleRememberCheckboxValue() {
    this.rememberMe = this.rememberMeCheckbox.nativeElement.checked
  }


  ngOnInit() {
    this.authError = null;
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  forgotPassword() {
    prompt({
      title: "Password Reset",
      message: "Enter your username to reset your password.",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        if (data.text) {
          this.usersService.generatePasswordResetRequest(data.text).subscribe(() => {
            alert({
              title: "Traverse",
              message: 'You should receive an email with a code to reset your password. Please follow the instructions provided.',
              okButtonText: "Ok"
            });
          }, (err) => {
            alert({
              title: "Traverse",
              message: `Couldn't send password reset request. Please confirm you have typed the correct username: ${err.error.errors[0].message}`,
              okButtonText: "Ok"
            });
          });
        } else {
          alert({
            title: "Traverse",
            message: "The username you entered appears to be invalid. Please try again.",
            okButtonText: "Ok"
          });
        }
      }
    });
  }

  submit() {
    const credentials = {
      username: this.authForm.get("username").value,
      password: this.authForm.get("password").value
    };
    if (!credentials.username || !credentials.password) {
      this.vibrator.vibrate(50);
      alert({ message: "Please provide both a username and password." });
      return;
    }
    this.processing = true;
    this.userService.attemptAuth("login", credentials, null, this.rememberMe).subscribe(res => {
      this.router.navigateByUrl("/events");
      this.processing = false;
    }, err => {
      this.vibrator.vibrate(50);
      this.authError = 'Incorrect Username/Password combination.';
      this.processing = false;
    });
  }
}
