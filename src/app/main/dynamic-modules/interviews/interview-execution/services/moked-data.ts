import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewCategory, IInterviewCategoryDefinition } from './../models/interview-category';
import { IInterviewField, IInterviewFieldMetadata, IInterviewFieldDefinition } from './../models/interview-field';

export const vitae1: IInterviewDefinition = {
  id: 'vitae1',
  categories: [
    {
      id: 'personal-info',
      name: 'Personal Info',
      displayName: 'Personal Info',
      order: 1,
      description: 'Recolecting data like address, contact methods, etc',
      pages: [

        {
          id: 'person-details',
          name: 'Personal details',
          displayName: 'Personal details',
          description: null,
          fields: [
            {
              id: 'person-details|firstname',
              label: 'First name',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'person-details|lastname',
              label: 'Last name',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'person-details|gender',
              label: 'Gender',
              description: undefined,
              metadata: {
                control: 'NULLABLEBOOLEAN',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'person-details|dob',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'DATE',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition
          ]
        },
        {
          id: 'postal-address',
          name: 'postalAddress',
          displayName: 'Postal address',
          description: null,
          fields: [
            {
              id: 'postal-address|street1',
              label: 'Street 1',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'postal-address|street2',
              label: 'Street 2',
              description: undefined,
              metadata: {
                control: 'INPUT',
                placeholder: 'ex Suite, Apt'
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'postal-address|country',
              label: 'Country',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'postal-address|state',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              id: 'postal-address|city',
              label: 'City',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition
          ]
        }
      ]
    } as IInterviewCategoryDefinition,
    {
      id: 'studies-info',
      name: 'Studies',
      displayName: 'Studies',
      description: 'Area to detail the studies and certifications'
    } as IInterviewCategoryDefinition,
    {
      id: 'skills-info',
      name: 'Skills Test',
      displayName: 'Skills Test',
      description: 'Tecnical skills and its levels'
    } as IInterviewCategoryDefinition
  ]
};
