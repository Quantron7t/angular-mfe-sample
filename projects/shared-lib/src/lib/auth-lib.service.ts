import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * **ATTN:** This shared auth service is only intended to expose the function of fetching token only.
 * The `shell app` is responsible for intiating the auth process and saving the token.  
 */
@Injectable({
  providedIn: 'root'
})
export class AuthLibService {

  constructor(private oauthService: OAuthService) { }

  printToken(){
    console.log(this.oauthService.getAccessToken());
  }
}
