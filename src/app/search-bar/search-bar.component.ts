import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShortnerService } from '../shortner.service';
import { QRCodeModule } from 'angularx-qrcode';
import { UrlMapping } from '../interface/url-mapping';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    QRCodeModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  urlGenerated = false;
  shortenedUrl = '';
  userUrl = new FormControl('');

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private searchBarService: ShortnerService
  ) {}

  shortenUrl() {
    let userUrl = this.userUrl.value;
    if (!userUrl) {
      // Check if input is empty
      this.snackBar.open('Input cannot be empty', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'], // Class for error styling
      });
      return; // Exit the function if input is empty
    }

    this.searchBarService.createUrlKey(userUrl).subscribe({
      next: (response: UrlMapping) => {
        this.shortenedUrl = `${window.location.href}${response.redirectKey}`;
        this.urlGenerated = true;
        this.snackBar.open('URL shortened successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (errorResponse) => {
        this.snackBar.open(`${errorResponse.error}`, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  copyToClipBoard() {
    let url = this.userUrl.value ?? '';
    this.clipboard.copy(this.shortenedUrl);
  }

  clear() {
    this.urlGenerated = false;
    this.userUrl.reset();
  }
}
