import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-meme-dialog',
  templateUrl: './meme-dialog.component.html',
  styleUrls: ['./meme-dialog.component.css']
})
export class MemeDialogComponent implements OnInit {

   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
               private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  downloadImage(img: any): void {
       const imgUrl = img.src;
       const imgName = this.data.image;
       this.httpClient.get(imgUrl, {responseType: 'blob' as 'json'})
         .subscribe((res: any) => {
           const file = new Blob([res], {type: res.type});

           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             window.navigator.msSaveOrOpenBlob(file);
             return;
           }

           const blob = window.URL.createObjectURL(file);
           const link = document.createElement('a');
           link.href = blob;
           link.download = imgName;

           link.dispatchEvent(new MouseEvent('click', {
             bubbles: true,
             cancelable: true,
             view: window
           }));

           setTimeout(() => {
             window.URL.revokeObjectURL(blob);
             link.remove();
           }, 100);
         });
     }

}
