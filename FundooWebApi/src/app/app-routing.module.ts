import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { SinglenoteComponent } from './components/singlenote/singlenote.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
const routes: Routes = [
  {path:"registration",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"resetpassword/:token",component:ResetpasswordComponent},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"userVerification/:token",component:UserVerificationComponent},

  {path:"dashboard" , component:DashboardComponent,
  children:[{path:"createnotes" , component:CreatenotesComponent},
  {path:"", component:DisplaynotesComponent}]},


  {path:"createnotes" , component:CreatenotesComponent},
  {path:"singlenote" , component:SinglenoteComponent},
  {path:"displaynotes" , component:DisplaynotesComponent}
  

  
];

@NgModule(
  {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
