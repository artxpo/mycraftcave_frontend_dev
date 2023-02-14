import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SocialAuthService,GoogleLoginProvider,SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileform!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService) { }

profilepic=["/assets/images/pfpic.png"];

  ngOnInit(): void 
  {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

}
