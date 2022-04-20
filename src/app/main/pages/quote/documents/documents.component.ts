import { IAppUploadResponse } from './../../../../shared/upload/upload.models';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { IDocumentSaveRequest } from 'src/app/main/services/document/document.models';
import { DocumentService } from 'src/app/main/services/document/document.service';
import { first } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent extends BaseComponent implements OnInit {


  constructor(private breadcrumbService: BreadcrumbService,
    private service: DocumentService,
    private quoteService: QuoteService
  ) {
    super();

  }


  ngOnInit(): void {
    this.breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_DOCUMENTS);
  }

  async uploadSuccess($event: { uploadResponse: IAppUploadResponse }) {
    const request = {
      entityType: 'QUOTE',
      entityId: this.quoteService.currentQuote.id,
      originalFileName: $event.uploadResponse.originalFileName,
      defaultStorageFilePath: $event.uploadResponse.storageFilePath,
      contentType: $event.uploadResponse.contentType,
      metadata: {}
    } as IDocumentSaveRequest;

    await firstValueFrom(this.service.save(request));
  }
}
