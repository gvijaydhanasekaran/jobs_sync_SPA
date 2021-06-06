import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  panelOpenState = false;
  constructor(private jobservice: JobService) { }


  ngOnInit(): void {
  }

  synJobs() {
    // alert("synJobs clicked");
    this.jobservice.synJobs()
      .subscribe(
        Response => {
          console.log(Response);
        },
        error => {
          console.log(error);
        });
  }

}
