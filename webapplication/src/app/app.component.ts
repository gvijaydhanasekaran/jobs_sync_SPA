import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webapplication';

  color = 'primary';
  mode:ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(public loadingService: LoadingService) {
    
  }
  ngOnInit(): void {
    this.loadingService.setLoading(false);
  }
}

