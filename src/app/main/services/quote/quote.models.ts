import { BusinessRuledRequest } from './../../../shared/common/business-models';
import { number } from 'ngx-custom-validators/src/app/number/validator'

export interface QuoteStateModel {
  currentQuote: Quote;

}


export interface IQuoteItem {
  id: number;
  description: string;

  productId: number;
  productName: string;

  customerId: number;
  customerName: string;

  createdDate: Date;
}
export interface Quote {
  id: string;
  description: string;
  product: QuoteProduct;

  createdDate: Date;
}

export interface QuoteProduct {
  id: number;
  name: string;
}


export interface AddQuoteRequest extends BusinessRuledRequest {
  description: string;
  activateDate: Date;
}

export interface AddQuoteResponse {
  id: number;
}


export interface UpdateQuoteRequest extends BusinessRuledRequest {
  description: string;
  activateDate: Date;
}

export interface UpdateQuoteResponse {
  id: number;
}
