import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { LoadingService } from './services/loading.service';

@Injectable()
export class JobServiceInterceptor implements HttpInterceptor {
    constructor(public loadingService : LoadingService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.setLoading(true);
        const modifiedReq = req.clone({ 
            headers: req.headers
              // .set('custom-header', `vijay-dhanasek`)
              .set('Content-Type', `application/json`),
          });
        return next.handle(modifiedReq).pipe(
            finalize(() => this.loadingService.setLoading(false))
        );
    }
}