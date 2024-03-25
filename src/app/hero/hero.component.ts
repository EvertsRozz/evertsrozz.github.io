import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { SpotifyApiService } from '../services/spotify-api.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  constructor(
    private SpotifyAuthService: SpotifyAuthService,
    private SpotifyApiService: SpotifyApiService
  ) {}

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  async receiveMessage(event: MessageEvent) {
    if (event.origin.startsWith('https://spiffy-sapp.web.app')) {
      console.log(`Succesfully authorised: ${event.data}`);
      const ACCESS_TOKEN = await this.SpotifyAuthService.getAccessToken(
        event.data
      );
      let artists: string[] = [];
      let tracks: string[] = [];
      if (ACCESS_TOKEN) {
        [artists, tracks] = await this.SpotifyApiService.getTop(ACCESS_TOKEN);
        console.log(artists);
        console.log(tracks);
      } else {
        console.error('didnt get top data');
      }
    } else {
      console.error('error of something');
      return;
    }
  }

  onBtnClick() {
    this.SpotifyAuthService.userAuth();
  }
}
