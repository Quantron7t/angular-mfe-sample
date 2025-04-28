import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SharedLibService, AuthLibService } from "shared-lib";
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shell-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
  copyrightMsg = '';

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  constructor(
    private sharedLibService: SharedLibService, 
    private authLibService: AuthLibService, 
    private oauthService: OAuthService, 
    private router: Router
  ) {
    this.copyrightMsg = sharedLibService.getCopyrightMessage();
    this.runInitialLoginSequence();
  }

  //Full Reference https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/blob/master/src/app/core/auth.service.ts
  async runInitialLoginSequence(): Promise<void> {
    this.authLibService.printToken();

    this.oauthService.configure(authCodeFlowConfig);
    
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.isDoneLoadingSubject$.next(true);
      if (!this.oauthService.hasValidAccessToken()) {
        console.log('Step initLoginFlow');
        this.oauthService.initLoginFlow();
      }
      else {
        console.log(`Step initLoginFlow ${this.oauthService.hasValidAccessToken()}`);
        this.authLibService.printToken();
      }
    } catch (ex) {
      console.log(`AUTH SERVICE FAILURE ${ex}`);
    }
  }
}
