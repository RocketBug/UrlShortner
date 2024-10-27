import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShortnerService as ShortnerService } from '../shortner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-short-url',
  standalone: true,
  imports: [],
  templateUrl: './short-url.component.html',
  styleUrl: './short-url.component.css',
})
export class ShortUrlComponent implements OnInit {
  isError = false;
  redirectLocation: string = '';
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private shortnerService: ShortnerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let urlKey = params.get('shortUrl') ?? '';
      if (!urlKey) {
        this.isError = true;
        return;
      }
      this.shortnerService.getUrlKey(urlKey).subscribe((response) => {
        let now = new Date();
        if (now > response.dateExpiry) {
          this.isError = true;
          this.snackBar.open('', 'Looks like this URL has expired.', {
            duration: 3000,
          });
          return;
        }
        this.redirectLocation = response.url;
        window.location.replace(response.url);
      });
    });
  }
}
