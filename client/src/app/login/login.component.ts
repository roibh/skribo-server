import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { UserService } from '../user.context.service';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { User, Auth } from '@skribo/client';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';



declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  @Output()
  public userData: any;

  @Output()
  public user = new EventEmitter();

  public group: any;
  modalRef: BsModalRef;
  modalPromise: Function = null;

  /**
   *
   */
  constructor(private ref: ChangeDetectorRef,
    private socialAuthService: AuthService,
    private modalService: BsModalService,
    private userService: UserService, private router: Router, private _ngZone: NgZone) {
    this.user.subscribe(async ($event) => {
      this._ngZone.run(async () => {
        const groups = await User.getGroups($event.id);

        const userRecord = $event;
        Object.assign(userRecord, { groups: groups });
        this.userService.setUser(userRecord);
        this.userData = userRecord;
        if (groups.length === 0) {
          this.router.navigateByUrl('/user/details');
        } else {
          this.userService.setGroup(groups[0]);
        }

        this.group = groups[0];
        this.ref.detectChanges();
      });
    });
  }



  public auth2: any;

  public setGroup(group) {
    this.group = group;
    this.userService.setGroup(group);
  }

  public decline() {
    this.modalRef.hide();
  }

  public JoinGroup(template) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  public async JoinConfirm(group_id) {
    const user_id = this.userService.getUser().id;

    const result = await User.attachToGroup(user_id, { GroupId: group_id });
    console.log(result);
  }


  public ShareGroup(template) {
    this._ngZone.run(async () => {
      this.modalRef = this.modalService.show(template, { class: 'modal-md' });

    });
  }

  async ngOnInit() {
    this.userData = this.userService.getUser();
    this.user.emit({ id: this.userData.id, name: this.userData.name });
  }


  public async socialSignIn() {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      async (userData) => {
        const result = await Auth.token(userData);
        this.userService.setToken(result.token);
        this.userService.setUser(result.user);
        this.user.emit({ id: userData.id, name: userData.name });
        this.router.navigate(['/adscript/manage']);
      });
  }
}
