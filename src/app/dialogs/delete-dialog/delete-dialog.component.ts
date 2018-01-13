import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent{

  private content:string;
  private header:string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.content = data.content;
    this.header = data.header;
  }

  Delete(){
    this.dialogRef.close(true);
  }

  Cancel(){
    this.dialogRef.close(false);
  }

}
