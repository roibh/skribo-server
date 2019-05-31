import { Component, OnInit, NgZone, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Sync } from '@skribo/client';
import { UserService } from '../user.context.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements OnInit {

  constructor(private _ngZone: NgZone, private modalService: BsModalService,
    public userService: UserService, private route: ActivatedRoute, ) { }
  modalRef: BsModalRef;
  modalPromise: Function = null;

  @Input()
  public variable: any;

  public list: any;
  public accounts: {};
  async ngOnInit() {
    const group_id = this.userService.getGroup().GroupId;
    this.list = await Sync.get_accounts(group_id);
    this.accounts = this.variable.value;
    if (typeof this.accounts !== 'object') {
      this.accounts = {};
    }
  }

  browseToSelect(template) {
    this.openModal(template);
  }
  async openModal(template: TemplateRef<any>) {
    return new Promise<boolean>((resolve, reject) => {
      this.modalPromise = resolve;
      this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    });
  }

  public isChecked(account) {
    return this.accounts[account.AccountKey];
  }
  public toggleAccounts(account) {
    if (this.accounts[account.AccountKey]) {
      delete this.accounts[account.AccountKey];
    } else {
      this.accounts[account.AccountKey] = account.AccountName;
    }
    this.variable.value = this.accounts;
  }

}
