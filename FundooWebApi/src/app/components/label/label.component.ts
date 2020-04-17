import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelService } from 'src/app/Services/label.service';
import { Label } from 'src/app/Model/label.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  noteId:number;
  labels: Label[];
  label:Label = new Label();

  constructor(public dialogRef: MatDialogRef<LabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private labelService: LabelService, private matSnackBar: MatSnackBar) {

       this.noteId = data.note.notesId;
       this.getAllLabel();

     }

  ngOnInit() {
  }
  getAllLabel(){
    this.labelService.getAllLabels().subscribe(
      (response:any) => {
        console.log("label list", response);
        this.labels = response.obj;
    
      }
    );
  }


  createLabel(input){
    this.label.labelName = input;
    this.labelService.createLabel(this.label).subscribe(
      (response:any) => {
        console.log("input:", input);
        console.log("response:", response);
        this.matSnackBar.open("Label Created","Ok",{duration:2000});
        this.label = response['obj'];
        // console.log("new label:",this.label);
       this.addLabel(this.label.labelId);
    
      }
    );

  }

  addLabel(labelId:any){

    this.labelService.addLabel(labelId , this.noteId).subscribe(
      (response:any) => {
     

        this.matSnackBar.open("Label added","Ok",{duration:3000});
    
      }
    );
}
}
