export interface ProductCategoryStateModel {
  currentCategory?: IProductCategory;
  productCategories?: IProductCategory[]
}

export interface IProductCategory {

}

export interface IProductCategoryItem {
  id: number;
  parentId: number;
  name: string;
  description: string;

  treeLevel: number;
  children: IProductCategoryItem[];
  tags: string;
}

export interface IProductCategoryDialogData {
  item: IProductCategoryItem;
  parent: IProductCategoryItem;
}

export interface AddProductCategoryRequest {
  name: string;
  description: string;
  parentId: number;
  tags: string;
}

export interface AddProductCategoryResponse {

}
