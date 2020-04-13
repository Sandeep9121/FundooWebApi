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
      
    ],[
      
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
