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
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    const params = new HttpParams().set('email', email).set('code', code);
    return this.httpClient.get(this.rootURL+'doCheckOTP',{params,responseType: 'text'}).pipe(
      map(response => response),
      catchError(this.errorHandler)
    );
  }

  create(resource){
    const params = new HttpParams()
        .set('email', resource);
    return this.httpClient.post(this.rootURL+ 'doGenerateOTP' , resource).subscribe(response => console.log(response));
    
  }

  get(email){
    const params = new HttpParams().set('email', email);
    return this.httpClient.get(this.rootURL+'doResentOTP',{params}).pipe(
        map(response =>response),
        catchError(this.errorHandler)
    );
  }

  delete(email){
    const params = new HttpParams().set('email', email);
    return this.httpClient.delete(this.rootURL+'doDeleteData',{params}).pipe(
        map(response => response),
        catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    if(error.status === 400)
      return throwError(new BadInputError(error));
    if(error.status === 404 )
      return throwError(new NotFoundError(error));
      console.log(error);
    return throwError(new AppError(error));
  }
}