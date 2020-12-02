import { Component, OnInit,OnDestroy } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { PostService } from './../services/post.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit,OnDestroy {

  isRequired: boolean;
  isNavigated: boolean;
  valid: boolean;
  isOtpEnabled: boolean;
  successMessage: boolean;
  failureMessage: boolean;
  isResetButtonEnable: boolean;
  submitClickFlag: boolean;
  mySubscription: any;
  isInvalid: String;
  otpSubmitTimer: number = 100;
  resendOtpTimer: number = 100;
  curSec: number = 0;
  color: ThemePalette = 'warn';
  otpTimerSubscribe: any;
  resendOtpTimerSubscribe: any;

  constructor(private postService: PostService, private router: Router) {
                this.isNavigated = true;
 }

  ngOnInit(): void {
    this.isNavigated = true;
    this.successMessage = false;
    this.failureMessage = false;
    this.submitClickFlag = true;
    this.isRequired = false;
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  makeOTPFetch = (inputValue) => {
    if(this.otpTimerSubscribe || this.resendOtpTimerSubscribe){
      this.doUnsubscribeTimer();
      this.otpSubmitTimer = 100;
      this.resendOtpTimer = 100;
    }
    if(inputValue.validationMessage === "") {
      this.valid = true;
      this.isOtpEnabled = true;
      this.startTimerOtp(20,inputValue.value);
      this.postService.create(inputValue.value);
    } 
  }

  startTimerOtp(seconds: number,inputValue: String) {
    this.otpSubmitTimer = 100;
    const timerInterval = interval(400);

    this.otpTimerSubscribe =  timerInterval.subscribe((sec) => {
      console.log(sec)
      this.otpSubmitTimer = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        console.log("Ended")
        this.postService.delete(inputValue).subscribe();
        alert("Retry OTP from first");
        this.doEnableFields();
        this.doUnsubscribeTimer();
      }
    });
  }

  doEnableFields() {
    this.valid = false;
    this.isOtpEnabled = false;
    this.isResetButtonEnable = false;
    if(this.otpTimerSubscribe || this.resendOtpTimerSubscribe){
      this.otpSubmitTimer = 100;
      this.resendOtpTimer = 100;
      this.doUnsubscribeTimer();
    }
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
      this.doUnsubscribeTimer();
    }else{
      alert("Please enter OTP to submit");
    }
  }

  onClickReset(inputValue){
    this.isResetButtonEnable = true;
    this.startTimerResendOtp(5);
    this.mySubscription = this.postService.get(inputValue).subscribe(post => console.log(post));
  }

  startTimerResendOtp(seconds: number) {
    this.resendOtpTimer = 100;
    const timerInterval = interval(400);

    this.resendOtpTimerSubscribe = timerInterval.subscribe((sec) => {
      this.resendOtpTimer = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        this.isResetButtonEnable = false;
        this.doUnsubscribeTimer();
      }
    });
  }

  doOnChangeEvent(event){
    if(event.currentTarget.validationMessage !== "") {
      this.isInvalid = event.currentTarget.validationMessage;
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  doUnsubscribeTimer() {
    this.otpTimerSubscribe.unsubscribe();
    this.resendOtpTimerSubscribe.unsubscribe();
  }

}
