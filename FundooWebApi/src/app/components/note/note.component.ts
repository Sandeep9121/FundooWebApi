import { Component, Input, OnInit} from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/Model/note.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from 'src/app/Model/label.model';
import { LabelService } from 'src/app/Services/label.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  labels:Label[];


  constructor(private noteService:NoteService,private labelService:LabelService,
    private matSnackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
  }
  
  // remove(label:any){
  //   this.labelService.removeLabel(label.labelId , this.note.notesId).subscribe(
  //     (response :any) => {
  //       console.log("response : ", response);
  //       this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
  //     }
  //   );
  // }
   



  pinNote()
  {
this.noteService.pinNote(this.note.notesId).subscribe(
  (response :any) => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
  }
);
  
}


RestoreNote(){
  this.noteService.restoreNote(this.note.notesId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
    );
}

deletePermanently(){
  this.noteService.deleteNotePermanently(this.note.notesId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}

open(note) {
  console.log("note updating", note);
  const matDialogueReference = this.dialog.open(UpdatenoteComponent, {
    width: "auto",
    height: "auto",
    data: { note }
  });
  matDialogueReference.afterClosed().subscribe(result => {
    console.log("note updated");
  });
}

}

