import { Injectable } from '@angular/core';
import { Artists } from '../interfaces/artists.interface';
import { SpotifyData } from '../interfaces/tracks.interface';

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

    // if data returns
    if (artists && tracks) {
      const artistObject: Artists = await artists.json();
      const tracksObject: SpotifyData = await tracks.json();

      let processedArtists: string[] = [];
      let processedTracks: string[] = [];

      // process the data in both for loops
      for (let artist of artistObject.items) {
        processedArtists.push(artist.name);
      }

      for (let track of tracksObject.items) {
        processedTracks.push(track.name);
      }

      return [processedArtists, processedTracks];
    } else {
      console.error("Spotify-api: artists and/or tracks couldn't be fetched.");
      return;
    }
  }
}
