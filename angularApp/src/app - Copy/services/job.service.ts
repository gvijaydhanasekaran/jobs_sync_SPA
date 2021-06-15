import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseURL:string = baseURL;
  constructor(private httpClient: HttpClient) { }

  synJobs(): Observable<any> {
    return this.httpClient.post(`${baseURL}/jobs/sync`, {});
  }

  getAllJobs(searchParms: any): Observable<any> {
    console.log("searchParms : ", searchParms);

    let params = new HttpParams();
    Object.keys(searchParms).forEach(p => {
      if (searchParms[p])
        params = params.append(p.toString(), searchParms[p].toString());
    });
    console.log("param1 : ", params.toString());

    return this.httpClient.get(`${baseURL}/jobs`, {
      params: new HttpParams({
        fromString: params.toString()
      })
    });

  }
}
