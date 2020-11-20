import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-failure-page',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.css']
})
export class FailurePageComponent {
  constructor(private router: Router,private location: Location){}
  doPreviousNavigate() {
    this.router.navigate(['/home']);
  }

}
