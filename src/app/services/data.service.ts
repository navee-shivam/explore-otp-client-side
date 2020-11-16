import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import {AppError} from './../common/app-error';
import { map,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class DataService {
  Data:any;

  constructor(private httpClient: HttpClient ,private rootURL: string ) { }

  getAll(email,code){
    const params = new HttpParams().set('email', email).set('code', code);
    return this.httpClient.get(this.rootURL+'doCheckOTP',{params}).pipe(
        map(response => console.log(response)),
        catchError(this.errorHandler)
    );
  }

  create(resource){
    const params = new HttpParams()
        .set('email', resource);
        console.log('param :' +params);
    return this.httpClient.post(this.rootURL+ 'doGenerateOTP' , resource).subscribe(response => console.log(response));
    
  }

  private errorHandler(error: HttpErrorResponse) {
    if(error.status === 400)
      return throwError(new BadInputError(error));
    if(error.status === 404 )
      return throwError(new NotFoundError(error));
    return throwError(new AppError(error));
  }
}