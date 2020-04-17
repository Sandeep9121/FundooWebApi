import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private labelUrl = environment.labelbaselUrl;
  private createLabelUrl = environment.createLabelUrl;
private deleteLabelUrl = environment.deleteLabelUrl;
private updateLabelUrl = environment.updateLabelUrl;
private getLabelUrl = environment.getLabelsUrl;
private addLabelUrl = environment.addLabelUrl;
private removeLabelUrl=environment.removeLabelUrl;
constructor(private httpService:HttpService , private httpClient:HttpClient) { }

private httpOptions={
  headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
  };

private subject = new Subject<any>();
public get autoRefresh() {
  return this.subject;
}

createLabel(label:any){
  //return this.httpService.post(this.labelUrl+this.createLabelUrl,label,this.httpOptions);
 // this.subject.next();
  return this.httpService.post(this.labelUrl+this.createLabelUrl,label,this.httpOptions).pipe(tap(()=>{ this.subject.next();}))

}

updateLabel(labelId:any){
  return this.httpService.put(`${this.labelUrl}${this.updateLabelUrl}?labelId=${labelId}`, "" , this.httpOptions);
}


getAllLabels(){
  return this.httpService.get(this.labelUrl+this.getLabelUrl,this.httpOptions);
}

addLabel(labelId:number , noteId:number){
  return this.httpService.post(`${this.labelUrl}${environment.addLabelUrl}?labelId=${labelId}&noteId=${noteId}`,"" , this.httpOptions);
}
deleteLabel(label:any){
  return this.httpService.delete(`${this.labelUrl}${this.deleteLabelUrl}?labelId=${label.labelId}` , this.httpOptions);
    }


  
    removeLabel(labelId:number , noteId:number){
      return this.httpService.post(`${this.labelUrl}${environment.removeLabelUrl}?labelId=${labelId}&notesId=${noteId}`,"" , this.httpOptions);
    }
}
