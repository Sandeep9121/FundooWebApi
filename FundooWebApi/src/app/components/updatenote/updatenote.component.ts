import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/Model/note.model';
import { NoteService } from 'src/app/Services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Label } from 'src/app/Model/label.model';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  note :Note;
  labels:Label[];
  constructor(private noteService: NoteService,public matDialogRef: MatDialogRef<UpdatenoteComponent>,
    private snackbar: MatSnackBar , @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.note=this.data.note;
    }
    // this.note=this.data.note;

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
  }
  
  onSubmit(){
    this.matDialogRef.close();
    this.noteService.updateNote(this.note.notesId , this.note).subscribe(
      (response: any) => {
        this.snackbar.open(response['message'], "ok", {duration: 4000});
      },
      errors => {
        this.snackbar.open(errors.error.message, "failed", {duration: 4000 });
      }
    );
  }



}
