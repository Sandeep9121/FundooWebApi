import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/Services/users.service';
import { NoteService } from 'src/app/Services/note.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {
  
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private httpservice: UsersService,
    private noteService: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice: DataService) { }
    form: FormGroup;
    file: File;
    ngOnInit() {
      this.createForm();
    }
  
    createForm() {
      this.form = this.formBuilder.group({
        file_upload: null
      });
    }
  
    // Check for changes in files inputs via a DOMString reprsenting the name of an event
    fileChange(event: any) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
      
    }
    verify: boolean


    upload() {
    
      const uploadImageData = new FormData();
      
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
      this.noteService.uploadImage(this.notesId,uploadImageData)
        .subscribe( (data) => { console.log(data) }, error => console.log(error),() => {
           console.log("completed")
            this.dataservice.changeMessage("uploaded");
          }
      );
    }
    
    notesId = this.data.notesId;
   

}
