import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { SpotifyAuthService } from '../../services/spotify-auth.service';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../main';
import { TopListComponent } from '../top-list/top-list.component';
import {
  Portal,
  PortalOutlet,
  ComponentPortal,
  PortalModule,
} from '@angular/cdk/portal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TopListComponent, PortalModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('portalOutlet', { static: true }) portalOutlet!: PortalOutlet;
  topListPortal!: ComponentPortal<TopListComponent>;

  constructor(
    private SpotifyAuthService: SpotifyAuthService,
    private SpotifyApiService: SpotifyApiService
  ) {}

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  ngAfterViewInit(): void {
    this.topListPortal = new ComponentPortal(TopListComponent);
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
        [artists, tracks] = await this.SpotifyApiService.getTop(
          ACCESS_TOKEN,
          false
        );
        console.log(artists);
        console.log(tracks);
        let componentRef = this.portalOutlet.attach(this.topListPortal);
        let instance: TopListComponent = componentRef.instance;
        instance.artists = artists;
        instance.tracks = tracks;
        // here
      } else {
        console.error('didnt get top data');
      }
    } else {
      console.error('error of something');
      return;
    }
  }

  onBtnClick() {
    logEvent(analytics, 'login');
    this.SpotifyAuthService.userAuth();
  }
}
