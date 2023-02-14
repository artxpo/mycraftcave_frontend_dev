import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login/public-api';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/accountservice.service';

declare var google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: SocialAuthService, private route:Router, private accountService: AccountService) { 
    if (this.accountService.accountValue) {
      this.route.navigate(['/home']);}
  }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }
  
  handleCredentialResponse(response:any) {
    console.log("Encoded JWT ID token: " + response.credential);}

  signInWithFB(): void {
    //this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.accountService.login();
  }
  loginWithGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // google.accounts.id.initialize({
    //   client_id: '92446788325-5aok28rgqubftmt159m7skrg2mh829he.apps.googleusercontent.com',
    //   callback: this.handleCredentialResponse
      
    // });
    // google.accounts.id.prompt();
    
  }
loginWithTwitter(){}

  
 
}
