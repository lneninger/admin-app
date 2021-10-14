import { BusinessRuledRequest } from '../../../shared/common/business-models';
import { number } from 'ngx-custom-validators/src/app/number/validator'

export interface SpecialistStateModel {
  currentSpecialist: Specialist;

}


export interface ISpecialistItem {
  id: number;
  description: string;

  productId: number;
  productName: string;

  customerId: number;
  customerName: string;

  createdDate: Date;
}
export interface Specialist {
  id: string;
  description: string;
  product: SpecialistProduct;

  createdDate: Date;
}

export interface SpecialistProduct {
  id: number;
  name: string;
}


export interface AddSpecialistRequest extends BusinessRuledRequest {
  description: string;
  activateDate: Date;
}

export interface AddSpecialistResponse {
  id: number;
}


export interface UpdateSpecialistRequest extends BusinessRuledRequest {
  description: string;
  activateDate: Date;
}

export interface UpdateSpecialistResponse {
  id: number;
}
