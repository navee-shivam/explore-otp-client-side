import { Component, OnInit,OnDestroy } from '@angular/core';
import { PostService } from './../services/post.service';
import { throwError,timer } from 'rxjs';
import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit,OnDestroy {

  isNavigated: boolean;
  valid: boolean;
  isOtpEnabled: boolean;
  successMessage: boolean;
  failureMessage:boolean;
  isResetButtonEnable: boolean;
  submitClickFlag: boolean;
  mySubscription: any;

  constructor(private postService: PostService,
              private router: Router) {
                this.isNavigated = true;
               }

  ngOnInit(): void {
    this.isNavigated = true;
    this.successMessage = false;
    this.failureMessage = false;
    this.submitClickFlag = true;
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  makeOTPFetch = (inputValue) => {
    if(inputValue.validationMessage === "") {
      this.valid = true;
      this.isOtpEnabled = true;
      this.postService.create(inputValue.value);
    }
  }

  doEnableFields() {
    this.valid = false;
    this.isOtpEnabled = false;
  }

  doSubmit = (email,code) => {
    if(code != "" && !isNaN(code)){
      this.submitClickFlag = false;
      this.mySubscription = this.postService.getAll(email,code).subscribe(posts => {
        console.log(posts);
        if(posts === "success"){
          this.isNavigated = false;
          this.router.navigate(['/success']);
        } else {
          this.submitClickFlag = true;
          this.isNavigated = false;
          this.router.navigate(['/failure']);
        }
      });
    }else{
      alert("Please enter OTP to submit");
    }
  }

  resetCountDownEvent(event,value) {
    if(event.action == 'done'){
      this.isResetButtonEnable = false;
    }
  }

  doInitializeAgain(event,inputValue){
    if(event.action == 'done' && this.submitClickFlag){
      alert("Time over");
      this.doEnableFields();
      this.postService.delete(inputValue).subscribe();
    }
  }

  onClickReset(resetEvent,inputValue){
    this.isResetButtonEnable = true;
    this.mySubscription = this.postService.get(inputValue).subscribe(post => console.log(post));
  }

}
