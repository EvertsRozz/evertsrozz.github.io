import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private _codeChallenge: string = '';
  constructor() {}

  // Generate a random string of the specified length
  protected generateRandomString(length: number): string {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    return Array.from(values)
      .map((x) => possible[x % possible.length])
      .join('');
  }

  protected generateCodeVerifier(): string {
    return this.generateRandomString(64);
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

  //TODO idk how the variable value is gonna get updated from its initial if all of the process is in functions
  // Code Challenge
  async codeChallenge() {
    const hashed = await this.sha256(this.generateCodeVerifier());
    this._codeChallenge = this.base64Encode(hashed);
    return this._codeChallenge;
  }
}
