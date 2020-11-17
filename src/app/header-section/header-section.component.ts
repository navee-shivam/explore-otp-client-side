import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { throwError } from 'rxjs';
import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {

  valid: boolean;
  isOtpEnabled: boolean;
  validMessage: boolean;
  failureMessage:boolean;
  isResetButtonEnable: boolean;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.validMessage = false;
    this.failureMessage = false;
  }

  makeOTPFetch = (inputValue) => {
    this.valid = true;
    this.isOtpEnabled = true;
    this.postService.create(inputValue);

    console.log(inputValue)
  }

  doEnableFields() {
    this.valid = false;
    this.isOtpEnabled = false;
    console.log("clicked")
  }

  doValidate = (email,code)=>{
    console.log(email);
    console.log(code);
    this.postService.getAll(email,code)
      .subscribe(posts => console.log);
  }

  resetCountDownEvent(event) {
    if(event.action == 'done'){
      console.log("completed");
      this.isResetButtonEnable = false;
    }
  }

  doInitializeAgain(event){
    if(event.action == 'done'){
      alert("Time over");
      this.doEnableFields();
    }
  }

  onClickReset(){
    this.isResetButtonEnable = true;
  }

}
