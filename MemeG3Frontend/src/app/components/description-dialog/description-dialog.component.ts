import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {
  public descriere: string;
  constructor(public dialogRef: MatDialogRef<DescriptionDialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
