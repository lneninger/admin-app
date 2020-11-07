
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription, of, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { InterviewManager } from './interview.manager';
import { ITemplateHandler } from './template.factory.service';



export interface IDisplayMetadata {

    type?: string;
    template: string;
    templateData: any;
    handler?: ITemplateHandler;
}

export class DisplayMetadata implements IDisplayMetadata {

    type: string;
    template: string;
    templateData: any;
    handler: ITemplateHandler;

    constructor(metadata: IDisplayMetadata, interviewManager: InterviewManager) {
        this.type = metadata.type;
        this.template = (metadata.template || 'input').toLowerCase();
        this.templateData = metadata.templateData || {};

    }
}


export interface IFieldMetadata {
    order: number;
    type: string;
    template: string;
    templateData: any;
    displayName: string;
    propertyName: string;
}



export interface CompletionProcess {
    categoriesCount?: number;
    completionProcesssId?: string;
    pageIndex: number;
}


