import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-list',
  standalone: true,
  imports: [],
  templateUrl: './top-list.component.html',
  styleUrl: './top-list.component.css',
})
export class TopListComponent implements OnInit {
  @Input() artists: string[] | undefined;
  @Input() tracks: string[] | undefined;

  ngOnInit(): void {
    let artists = this.artists;
    let tracks = this.tracks;
  }
}
