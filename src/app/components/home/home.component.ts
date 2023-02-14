import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/accountservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accounts: any[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
      this.accountService.getAll()
          .pipe(first())
          .subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(id: string) {
      const account = this.accounts.find(x => x.id === id);
      account.isDeleting = true;
      this.accountService.delete(id)
          .pipe(first())
          .subscribe(() => this.accounts = this.accounts.filter(x => x.id !== id));
  }

}
