import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatMenuModule} from '@angular/material/menu'
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
import { IconsComponent } from './components/icons/icons.component';
import { NoteComponent } from './components/note/note.component';
import { NotePipe } from './pipes/note.pipe';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { LabelComponent } from './components/label/label.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule,MatChipsModule} from '@angular/material';
import { EditlabelComponent } from './components/editlabel/editlabel.component';
import { LabelPipe } from './pipes/label.pipe';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    UserVerificationComponent,
   DashboardComponent,
   DisplaynotesComponent,
   CreatenotesComponent,
   IconsComponent,
   NoteComponent,
   NotePipe,
   UpdatenoteComponent,
   LabelComponent,
   EditlabelComponent,
   LabelPipe
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    MatInputModule,

    MatFormFieldModule,

    MatCardModule,

    MatButtonModule,

    HttpClientModule,

    MatSnackBarModule,

    ReactiveFormsModule,

    MatIconModule,

    MatToolbarModule,

    MatSidenavModule,

    MatTooltipModule,

    MatDividerModule

    ,FlexLayoutModule

    ,MatMenuModule

    ,MatDialogModule

    ,MatBottomSheetModule

    ,MatSelectModule

    ,MatGridListModule

    ,MatButtonToggleModule

    ,FormsModule

    ,MatCheckboxModule
    ,MatListModule
    ,MatChipsModule
  
  
  ],

  entryComponents:[
    LabelComponent,
    EditlabelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
