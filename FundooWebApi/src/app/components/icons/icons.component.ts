import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import { Note } from 'src/app/Model/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LabelComponent } from '../label/label.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;
  reminderDate:string;
  datePipeString : string;
  tommorrowDate:string;
  setReminderDate:string;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,private matDialog: MatDialog , private datePipe: DatePipe) { 
      this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
    console.log("date today:",this.datePipeString);
    }

  colorsList = [
    [
      {
        colorCode: "rgba(128, 0, 128,0.5)", name: "purple"
      },
      {
        colorCode: "rgba(0, 0, 228,0.5)", name: "Navy"
      },
      {
        colorCode: "rgba(0, 128, 0,0.5)", name: "Green"
      },
    ],
    [
      {
        colorCode: "rgba(255, 255,0.6)", name: "Yellow"
      },
      {
        colorCode: "rgba(128, 0, 0,0.4)", name: "Maroon"
      },
      {
        colorCode: "rgba(192, 192, 192,0.5)", name: "silver"
      }

    ], [

      {
        colorCode: "rgba(255, 255, 255,1)", name: "white"
      },
      {
        colorCode: "rgba(208, 225, 238,0.5)", name: "blue"
      },
      {
        colorCode: "rgba(255, 0, 0,0.5)", name: "Red"
      },

    ]
  ]

  ngOnInit() {
  }

  archieveNote() {
    this.noteService.archieveNote(this.note.notesId).subscribe(
      (response: any) => {
        if (this.note.archieved == true) {
          console.log("response : ", response);
          this.matSnackBar.open("note is UnArchieved", "Ok", { duration: 4000 })
        }
        else if (this.note.pinned == true) {
          this.matSnackBar.open("Note Archived and unPinned", "OK", { duration: 4000 });
        }
        else {
          this.matSnackBar.open("Note Archived", "OK", { duration: 4000 });
        }

      }
    );

  }

  deleteNote() {
    this.noteService.trashNote(this.note.notesId).subscribe(
      (response: any) => {
        console.log("response : ", response);
        this.matSnackBar.open(response['message'], "Ok", { duration: 4000 })
      }
    );
  }

  changeColor(color) {
    console.log(color.name);
    this.noteService.addColor(this.note.notesId, color.name).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open(response['message'], "ok", {
          duration: 4000
        });
      }
    );
  }


  openLabel(note): void {
    const dialogRef = this.matDialog.open(LabelComponent, {
      width: '250px', height: 'auto', data: { note }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('matdialog closed');
    });
  }


  addCollaborator(note){
    const dialogRef=this.matDialog.open(CollaboratorComponent,{
      data:{notesId:note.notesId}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("collaborator ");
    });
  }
  

  today(note)
{
  let time:string="9:00";
this.reminderDate = this.datePipeString+","+time+":00";
let newDate = new Date(this.reminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteService.addReminder(note.notesId , reminder).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
  }
);

}

tommorrow(note)
{
  let time:string="9:00";
  const cal = new Date();
  cal.setDate(cal.getDate() + 1);
  this.reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
  this.tommorrowDate = this.datePipe.transform(this.reminderDate,'yyyy-MM-dd');
  console.log("tommorrow date:",this.tommorrowDate);
  this.setReminderDate = this.tommorrowDate+","+time+":00";


  // this.reminderDate = cal.getFullYear() + ':' + cal.getMonth() + ':' + cal.getDate();
  console.log("set date:",this.setReminderDate);
  let newDate = new Date(this.setReminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteService.addReminder(note.notesId , reminder).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
  }
);
}

nextWeek(note)
{
  let time:string="9:00";
  const cal = new Date();
  cal.setDate(cal.getDate() + (1 + 7 - cal.getDay()) % 7);  
  
  this.reminderDate = cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
  console.log("next week monday:",this.reminderDate);

  this.setReminderDate = this.reminderDate+","+time+":00";
  console.log("set date:",this.setReminderDate);
  let newDate = new Date(this.setReminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteService.addReminder(note.notesId , reminder).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
  }
);
}


}


