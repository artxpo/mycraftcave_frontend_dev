import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login/public-api';

import { AccountService } from 'src/app/services/accountservice.service';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { GoogleAuthService } from 'src/app/services/google.service';



declare var google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [GoogleAuthService]
})

export class LoginComponent implements OnInit {
  public userData;
  
  imageURL  : string;
  email : string;
  name  : string; 
  token  : string;
  @Output() onSigninSuccess = new EventEmitter();
  @Input() clientId: string;
  
  
  
  form: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private authService:SocialAuthService,
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private auth: GoogleAuthService
      ) { 
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });


  // google.accounts.id.initialize({
  //   client_id: 'your_client_id',
  //   callback: this.handleCredentialResponse
  // });
  
  // google.accounts.id.prompt();
  
    
  }
  
  handleCredentialResponse(response:any) {
    console.log("Encoded JWT ID token: " + response.credential);}

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    //   .then(() => this.route.navigateByUrl("profile"));

      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        localStorage.setItem('userData', JSON.stringify(this.userData));
          this.router.navigateByUrl("profile");
       
      });

    }

  
  loginWithGoogle(): void{
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then((userData) => {
    //     localStorage.setItem('userData', JSON.stringify(this.userData));
    //       this.router.navigateByUrl("profile");
       
    //   });
    this.auth.authenticateUser(this.clientId, this.onSigninSuccess);

    //this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}

        }