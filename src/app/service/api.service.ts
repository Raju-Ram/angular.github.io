import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

 apiUrl:string;

  constructor(private http: HttpClient) {
    this.apiUrl= environment.apiUrl;
   }

   public HttpPostType(apiName, data) {
    const httpOptions = {
      headers: new HttpHeaders({
      //  Authorization: this.GetToken(),
      //   'Accept':  'application/x-www-form-urlencoded',
      //   'Content-Type':  'application/x-www-form-urlencoded'
      }),
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/" + apiName, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  HttpGetType(apiName:any){
    return this.http.get(this.apiUrl + "/" + apiName);
  }


}
