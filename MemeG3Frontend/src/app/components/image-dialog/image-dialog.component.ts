import { Component, OnInit } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  fileToUpload: File | null = null;
  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>) { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event): void {
    // @ts-ignore
    this.fileToUpload = event.target.files[0];
  }

  close(): void {
    this.dialogRef.close();
  }
}
