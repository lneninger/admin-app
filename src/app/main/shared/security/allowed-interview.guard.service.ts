import { ProductOrchestratorService } from './../../services/+products/product-orchestrator.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IAvailableInterview } from 'src/app/services/interview/interview.model';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AllowedInterviewGuardService {

    constructor(private productOrchestrator: ProductOrchestratorService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {

        const interview = route.data.interview as IAvailableInterview;
        return new Observable(observer => {
            // debugger;
            const productService = this.productOrchestrator.productServices.find(productServiceItem => (interview && productServiceItem.productCategory.toUpperCase() === interview.interviewType.toUpperCase()) || productServiceItem.productCategory.toUpperCase() === route.parent.parent.routeConfig.path.toUpperCase());
            if (productService) {
                productService.stageTrackerContext$.pipe(filter(_ => !!_)).subscribe(context => {
                    const result = context.stage.id.toUpperCase().indexOf(interview.assessmentType) >= 0;
                    observer.next(result);

                });
            } else {
                observer.next(false);
            }

        });
    }
}
