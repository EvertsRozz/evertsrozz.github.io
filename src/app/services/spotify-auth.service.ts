import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SpotifyTokenResponse } from '../interfaces/SpotifyTokenResponse.interface';
import { SPOTIFY_CLIENT_ID, REDIRECT_TARGET } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  protected codeVerifier!: string;

  constructor(private http: HttpClient) {}

  // Generate a random string of the specified length
  protected generateRandomString(): string {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = new Uint8Array(64);
    crypto.getRandomValues(values);
    return Array.from(values)
      .map((x) => possible[x % possible.length])
      .join('');
  }

  //? find out what data type the code verifier returns
  // Code Challenge setup
  protected async sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  protected base64Encode(input: any) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  // Code Challenge
  protected async codeChallenge() {
    const hashed = await this.sha256(this.codeVerifier);
    return this.base64Encode(hashed);
  }

  async userAuth() {
    const cliendId: string = SPOTIFY_CLIENT_ID;
    const redirectUri: string = REDIRECT_TARGET;

    const scopes: string = 'user-top-read';
    const authUrl = new URL('https://accounts.spotify.com/authorize');

    let storedCodeVerifier = localStorage.getItem('codeVerifier');

    if (storedCodeVerifier) {
      // console.log('the codeverifier is stored in the local stoarge userAuth()');
      this.codeVerifier = storedCodeVerifier;
    } else {
      this.codeVerifier = this.generateRandomString();
      localStorage.setItem('codeVerifier', this.codeVerifier);
      // console.log('the variable has been set in local storage userAuth()');
    }

    const _codeChallenge = await this.codeChallenge();
    // console.log(_codeChallenge);

    //params added to the search query
    const params = new URLSearchParams();
    params.append('client_id', cliendId);
    params.append('response_type', 'code');
    params.append('redirect_uri', redirectUri);
    params.append('scope', scopes);
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', _codeChallenge);
    // console.log(params.toString());

    // redirect to spotify for login
    authUrl.search = new URLSearchParams(params).toString();
    window.open(authUrl.toString(), '_blank');
  }

  async getAccessToken(code: string) {
    const clientId = SPOTIFY_CLIENT_ID;
    const redirectUri = REDIRECT_TARGET;
    const body = new URLSearchParams();
    body.append('client_id', clientId);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', redirectUri);
    body.append('code_verifier', this.codeVerifier);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // returns the access token and refresh token
    try {
      const response$ = this.http.post<SpotifyTokenResponse>(
        'https://accounts.spotify.com/api/token',
        body.toString(),
        { headers }
      );
      if (!response$) {
        console.error('no response recieved');
        return;
      }
      const data = await firstValueFrom(response$);
      if (data.error) {
        console.error(`Error getting access token: ${data.error}`);
        return;
      }
      if (data.access_token) {
        return data.access_token;
      } else {
        console.error(`No access token recieved`);
        return;
      }
    } catch (e) {
      console.error(`error in getAccessToken:`, e);
      return;
    }
  }
}
