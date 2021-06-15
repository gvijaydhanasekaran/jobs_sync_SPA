import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  panelOpenState = false;
  jobs: any;
  paginationData:any = {
    'url' : '',
    'currentPage' : 5,
    'nextPageNumbers' : [1],
    'prevPageNumbers' : [1]
  };
  // searchParms: { [key: string]: string } = {
    searchParms: any = {
    'company' : '',
    'location' : '',
    'title' : '',
    'description' : '',
    'type' : '',
    'page' : 6,
    'pageSize' : 5
  };

  constructor(private jobservice: JobService) { }

  ngOnInit(): void {
    this.jobs = [];
    this.fetchALLjobs();
    // alert(this.searchParms.company);
    // this.searchParms.company = "vijay";
    // alert(this.searchParms.company);
  }

  fetchALLjobs() {
    this.jobservice.getAllJobs(this.searchParms)
      .subscribe(
        response => {
          console.log(response);
          if (response.data) {
            this.jobs = response.data;
            // let params = new HttpParams();
            // Object.keys(this.searchParms).forEach(p => {
            //   if (this.searchParms[p])
            //     params = params.append(p.toString(), this.searchParms[p].toString());
            // });
            // console.log("param1 : ", params.toString());
            // this.paginationData.url = this.jobservice.baseURL + "/jobs?" + params.toString();

            this.paginationDataProcess(response.paginationData);
            console.log("this.jobs : ", this.jobs);
          }
        },
        error => {
          console.log(error);
    });
  }

  openPage(pageNumber:number) {
    // alert();
    this.searchParms.page = pageNumber;
    this.fetchALLjobs();
  }

  paginationDataProcess(data:any) {
    this.searchParms.page = data.currentPage;
    this.paginationData.currentPage = data.currentPage;
    this.paginationData.nextPageNumbers = [];
    // for (var pagenum = parseInt(data.currentPage) +1; pagenum<data.totalNoOfPages; pagenum++) {
    //   if (this.paginationData.nextPageNumbers.length < 3) {
    //     this.paginationData.nextPageNumbers.push(pagenum);
    //   }
    // }

    for (let pagenum = data.currentPage+1; pagenum < data.currentPage+4; pagenum++) {
    // for (var pagenum = parseInt(data.currentPage) +1; pagenum<data.totalNoOfPages; pagenum++) {
      if (pagenum > data.totalNoOfPages)
        break;
      if (this.paginationData.nextPageNumbers.length < 3) {
        this.paginationData.nextPageNumbers.push(pagenum);
      }
    }
    this.paginationData.nextPageNumbers.sort(function(a:number, b:number){return a-b})

    // console.clear();
    this.paginationData.prevPageNumbers = [];
    console.log("data.currentPage : ", data.currentPage);
    for (let prevnum = data.currentPage-1; prevnum > data.currentPage-4; prevnum--) {
      console.log(this.paginationData.prevPageNumbers.length, 'prevnum : ', prevnum, this.paginationData.prevPageNumbers);
      if (prevnum == 0)
        break;
      if (this.paginationData.prevPageNumbers.length < 3) {
        this.paginationData.prevPageNumbers.push(prevnum);
        // break;
      }
    }
    this.paginationData.prevPageNumbers.sort(function(a:number, b:number){return a-b})
    console.log("data : ", data);
    console.log("this.paginationData : ", this.paginationData);

  }

  clearSearchData() {
    this.searchParms = {
      'company' : '',
      'location' : '',
      'title' : '',
      'description' : '',
      'type' : ''
    };
    this.fetchALLjobs();
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

  openGithubJob(url: string) {
    window.open(url, "_blank");
  }
}
