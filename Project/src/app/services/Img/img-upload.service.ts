import { Injectable } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private router:Router, private form:FormsModule, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  imgupload(fd) {
    return this.httpService.post<any>(this.apiURL + 'upload',fd)
  }
  imguploads(fd) {
    return this.httpService.post<any>(this.apiURL + 'uploads',fd)
  }


}
