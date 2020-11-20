import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { FailurePageComponent } from './failure-page/failure-page.component';

const routes: Routes = [
  { path: 'home', component: HeaderSectionComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'failure', component: FailurePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
