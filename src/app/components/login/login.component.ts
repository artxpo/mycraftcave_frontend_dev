import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  public userData;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: SocialAuthService, private route:Router, private accountService: AccountService) { 
    
  }

  ngOnInit(): void {
    
    
  }
  
  handleCredentialResponse(response:any) {
    console.log("Encoded JWT ID token: " + response.credential);}

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    //   .then(() => this.route.navigateByUrl("profile"));

      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        localStorage.setItem('userData', JSON.stringify(this.userData));
          this.route.navigateByUrl("profile");
       
      });

    }

  
  loginWithGoogle(): void{
    
  //   google.accounts.id.initialize({
  //     client_id: '92446788325-5aok28rgqubftmt159m7skrg2mh829he.apps.googleusercontent.com',
  //     callback: this.handleCredentialResponse
      
  //   });
  //   google.accounts.id.prompt();
    
  }
// loginWithTwitter(){}

        }