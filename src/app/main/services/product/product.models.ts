export interface ProductStateModel {
  currentProduct?: IProduct;
  products?: IProduct[]
}

export interface IProduct {

}

export interface IProductItem {
  id: number;
  parentId: number;
  name: string;
  description: string;
  categoryId: string;

  treeLevel: number;
  children: IProductItem[];
  tags: string;
}

export interface IProductDialogData {
  item: IProductItem;
  parent: IProductItem;
}

export interface AddProductRequest {
  name: string;
  description: string;
  parentId: number;
  tags: string;
}

export interface AddProductResponse {

}
