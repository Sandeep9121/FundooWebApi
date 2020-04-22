import { Component, Input, OnInit} from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/Model/note.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from 'src/app/Model/label.model';
import { LabelService } from 'src/app/Services/label.service';
import { Users } from 'src/app/Model/users.model';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  labels:Label[];
  collaborators:Users[];
  datePipeString : string;
  displayReminder :string;

  constructor(private noteService:NoteService, private labelService:LabelService,private userService:UsersService,
    private matSnackBar: MatSnackBar,private dialog: MatDialog , private datePipe: DatePipe) {
      this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
     }

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
    this.getCollaborators();
    console.log("type of reminder:",typeof this.note.reminder);
    this.slice();

  }

  slice()
  {
    var rem = this.note.reminder;
    var today = this.datePipeString;
    if(rem!=null){
var res = rem.slice(0,-9);
    }
    else{
      res = null;
    }
console.log("result:",res);
console.log("this only:",today);

const cal = new Date();
cal.setDate(cal.getDate() + 1);
var reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
var tommorrowDate = this.datePipe.transform(reminderDate,'yyyy-MM-dd');

if(today==res)
{
  this.displayReminder = "Today,8:00PM"

}

else if(tommorrowDate==res){
this.displayReminder = "Tommorrow,8:00AM"
}

else{
  this.displayReminder = rem;
}

  }
  
  
  remove(label:any){
    this.labelService.removeLabel(label.labelId , this.note.notesId).subscribe(
      (response :any) => {
        console.log("response : ", response);
        this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
      }
    );
  }
   



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

removeReminder(noteId:any){
  this.noteService.deleteReminder(noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  )
}

getCollaborators()
{
 this.userService.getCollaborators(this.note.notesId).subscribe(
  (response:any)=>{
    // this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
    this.collaborators = response['obj'];
    console.log("collaborators list:",this.collaborators);
  },
  (error:any)=> {
      this.matSnackBar.open(error.error.message, "failed", {duration:5000});
    }
 ) 
}

}

