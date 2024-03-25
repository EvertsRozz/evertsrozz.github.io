import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyApiService {
  constructor() {}

  async getTop(token: string): Promise<any> {
    const artists = await fetch('https://api.spotify.com/v1/me/top/artists', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const tracks = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (artists && tracks) {
      const artistObject = await artists.json();

      const tracksObject = await tracks.json();
      return { artistObject, tracksObject };
    } else {
      console.error("Spotify-api: artists and/or tracks couldn't be fetched.");
      return;
    }
  }
}
