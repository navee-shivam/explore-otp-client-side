import { AppErrorHandler } from './common/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//importing material icon module
import { MaterialModule } from './ui-module/material.module';
import { PostService } from './services/post.service';
import { CountdownModule } from 'ngx-countdown';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { FailurePageComponent } from './failure-page/failure-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent,
    SuccessPageComponent,
    FailurePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Adding Material Design Module
    MaterialModule,
    CountdownModule,
  ],
  providers: [
    PostService,
    { provide: ErrorHandler , useClass : AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
