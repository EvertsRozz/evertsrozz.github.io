import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  imports: [],
  templateUrl: './auth-redirect.component.html',
  styleUrl: './auth-redirect.component.css',
})
export class AuthRedirectComponent implements OnInit {
  ngOnInit(): void {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('code')) {
        let code = urlParams.get('code');
        window.opener.postMessage(code, 'https://spiffy-sapp.web.app');
        window.close();
      }
    } catch (e) {
      console.error(`authRedirect component error: ${e}`);
    }
  }
}
