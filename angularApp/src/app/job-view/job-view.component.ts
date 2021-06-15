import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {
  data:any;
  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.viewJob(this.route.snapshot.params.id).subscribe(response => {
      this.data = response;
    });
  }

}
