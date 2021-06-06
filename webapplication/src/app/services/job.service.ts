import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) { }

  synJobs(): Observable<any> {
    return this.httpClient.post(`${baseURL}/jobs/sync`, {});
  }
}
