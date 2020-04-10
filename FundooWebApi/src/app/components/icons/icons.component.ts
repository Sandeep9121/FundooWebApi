import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import { Note } from 'src/app/Model/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar) { }

  colorsList = [
    [
      { 
        colorCode: "rgba(198, 222, 255,1)", name: "Blue" 
      },
      { 
        colorCode: "rgba(229, 228, 226,1)", name: "Gray" 
      },
      { 
        colorCode: "rgba(230, 169, 236,1)", name: "Pink" 
      },
    ],
    [
      { 
        colorCode: "rgba(233, 171, 23,1)", name: "Yellow" 
      },
      { 
        colorCode: "rgba(249, 150, 107,1)", name: "Orange" 
      },
      { 
        colorCode: "rgba(255,255,255,1)", name: "white" 
      },
    ]
  ]

  ngOnInit() {
  }

  archieveNote()
{
this.noteService.archieveNote(this.note.notesId).subscribe(
(response :any) => {
  console.log("response : ", response);
  this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
}
);

}

deleteNote(){
  this.noteService.trashNote(this.note.notesId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
    );
}

changeColor(color){
  console.log(color.name);
  this.noteService.addColor(this.note.notesId , color.name).subscribe(
    response => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "ok", {
        duration: 4000
      });
    }
  );
}

}
