import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {SocialAuthService,GoogleLoginProvider,SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileform!: FormGroup;
  
  isLoggedin?: boolean;
  public userData :any;
  constructor(private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService, private route:Router) 
    {
      this.socialAuthService.authState.subscribe((user) => {
        this.userData = user;
       // this.isLoggedin = user != null;
       console.log(this.userData);
      });
}
     

  ngOnInit(): void 
  {
    
      
    
  }

}
