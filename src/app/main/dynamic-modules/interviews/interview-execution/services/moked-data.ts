import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewCategory, IInterviewCategoryDefinition } from './../models/interview-category';
import { IInterviewField, IInterviewFieldMetadata, IInterviewFieldDefinition } from './../models/interview-field';

export const vitae1: IInterviewDefinition = {
  id: 'vitae1',
  categories: [
    {
      name: 'personal-info',
      displayName: 'Personal Info',
      order: 1,
      description: 'Recolecting data like address, contact methods, etc',
      pages: [

        {
          name: 'person-details',
          displayName: 'Personal details',
          description: null,
          fields: [
            {
              name: 'person-details|firstname',
              label: 'First name',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'person-details|lastname',
              label: 'Last name',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'person-details|gender',
              label: 'Gender',
              description: undefined,
              metadata: {
                control: 'NULLABLEBOOLEAN',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'person-details|dob',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'DATE',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition
          ]
        },
        {
          name: 'postal-address',
          displayName: 'Postal address',
          description: null,
          fields: [
            {
              name: 'postal-address|street1',
              label: 'Street 1',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|street2',
              label: 'Street 2',
              description: undefined,
              metadata: {
                control: 'INPUT',
                placeholder: 'ex Suite, Apt'
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|country',
              label: 'Country',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|state',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|city',
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
      name: 'studies-info',
      displayName: 'Studies',
      description: 'Area to detail the studies and certifications'
    } as IInterviewCategoryDefinition,
    {
      name: 'skills-info',
      displayName: 'Skills Test',
      description: 'Tecnical skills and its levels'
    } as IInterviewCategoryDefinition
  ]
};
