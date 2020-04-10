import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;
  private getNotesUrl = environment.getAllNotesUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.archieveUrl;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.addColorUrl;
  private getArchieveNoteUrl = environment.getArchieveUrl;
  private getTrashedNoteUrl = environment.getTrashedUrl;
  private getPinnedNoteUrl = environment.getPinnedNoteUrl;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

createNote(noteDetail:any):Observable<any>
{
  console.log("note:",noteDetail);
return this.httpService.post(this.noteApiUrl+this.createNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
}

getAllNotes():Observable<any>{

  return this.httpService.get(this.noteApiUrl+this.getNotesUrl,this.httpOptions);
}
pinNote(notesId:number){
  console.log("noteId:"+notesId);
  return this.httpService.put(this.noteApiUrl+this.pinNoteUrl+notesId,"",this.httpOptions);
}

archieveNote(notesId:number){
  return this.httpService.put(this.noteApiUrl+this.archieveNoteUrl+notesId , "" , this.httpOptions);
}

trashNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+this.trashNoteUrl+noteId, "" , this.httpOptions);
}

addColor(noteId:number , color:string){
  return this.httpService.put(`${this.noteApiUrl}${this.addColorUrl}?notesId=${noteId}&color=${color}`, "" , this.httpOptions);
}

getArchieveNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getArchieveNoteUrl,this.httpOptions);
}

getTrashedNotes():Observable<any>
{
  return this.httpService.get(this.noteApiUrl+this.getTrashedNoteUrl,this.httpOptions);
}

getPinnedNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getPinnedNoteUrl , this.httpOptions);
}

}
