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
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  urlGenerated = false;
  userUrl = new FormControl('');

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  shortenUrl() {
    if (!this.userUrl.value) {
      // Check if input is empty
      this.snackBar.open('Input cannot be empty', 'Close', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['error-snackbar'], // Class for error styling
      });
      return; // Exit the function if input is empty
    }

    // Here you would add your logic to shorten the URL
    // For demonstration, we will just set urlGenerated to true
    this.urlGenerated = true;

    // Display success snackbar
    this.snackBar.open('URL shortened successfully!', 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['success-snackbar'], // Class for success styling
    });
  }

  copyToClipBoard() {
    let url = this.userUrl.value ?? '';
    this.clipboard.copy(url);
  }

  clear() {
    this.urlGenerated = false;
    this.userUrl.reset();
  }
}
