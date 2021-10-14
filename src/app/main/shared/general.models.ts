import { LabelValueLower } from 'src/app/shared/general.models';

export enum InformationSources {
  Tenant = 0,
  Member = 1,
  Geocode = 2
}

export const Genders: LabelValueLower[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Unknown', value: 'unknown' }
];

export enum PreIdentifiedStatus {
  Veteran,
  Facility
}


export enum Language {
  English,
  Spanish,
  Other = 1000
}

export const Languages: { id: string, name: string, englishName: string, number: number }[] = [
  { id: 'English', name: 'English', englishName: 'English', number: 1 },
  { id: 'Spanish', name: 'Español', englishName: 'Spanish', number: 2 },
  { id: 'Unknown', name: 'Unknown', englishName: 'Unknown', number: 99 },
  { id: 'Other', name: 'Other', englishName: 'Other', number: 1000 },
];


export enum ProductCategoryNames {
  Medicaid = 'medicaid',
  SNAP = 'snap',
  LIS = 'lis',
  Community = 'community',
  VA = 'va'
}

export const ProductCategoryList = Object.getOwnPropertyNames(ProductCategoryNames).map(prop => ProductCategoryNames[prop]);



