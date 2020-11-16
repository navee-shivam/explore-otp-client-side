import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService extends DataService {
  constructor(httpClient: HttpClient) { 
    super(httpClient,'http://localhost:8080/');
  }
}
