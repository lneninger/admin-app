import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewCategoryDefinition } from './../models/interview-category';
import { IInterviewFieldDefinition, IInterviewFieldMetadata } from './../models/interview-field';

export const vitae1: IInterviewDefinition = {
  id: 'vitae1',
  categories: [
    {
      name: 'personal-info',
      displayName: 'Personal Info',
      order: 1,
      description: 'Recolecting data like address, contact methods, etc',
      validators:[
        {
          type: 'VALIDATION',
          rule: {

          },
          message: ''
        }
      ],
      pages: [
        {
          name: 'person-details',
          displayName: 'Personal details',
          description: null,
          fields: [
            {
              name: 'firstName',
              label: 'First name',
              description: undefined,
              order: 1,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  id: 'required',
                  type: 'VALIDATION',
                  rule: {
                    // expression: '1 == 1'
                    expression: 'firstName != null and length(trim(firstName)) > 0'
                  },
                  message: 'First name is required'
                },
                {
                  id: 'gt-2',
                  type: 'VALIDATION',
                  rule: {
                    // expression: '2 == 2'
                    // expression: 'length(x) > 2'
                    expression: 'abs(profit) > 20.5'
                  },
                  message: 'First name most be greater that 2 char length'
                },

              ],
            } as IInterviewFieldDefinition,
            {
              name: 'lastName',
              label: 'Last name',
              description: undefined,
              order: 1,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  id: 'required',
                  type: 'VALIDATION',
                  rule: {
                    expression: 'lastName != null && lastName.trim().length > 0'
                  },
                  message: 'Last name is required'
                },
                {
                  id: 'gt-2',
                  type: 'VALIDATION',
                  rule: {
                    expression: 'lastName.length > 2'
                  },
                  message: 'Last name most be greater that 2 char length'
                },
              ],
            } as IInterviewFieldDefinition,
            {
              name: 'person-details|gender',
              label: 'Gender',
              description: undefined,
              order: 1,
              metadata: {
                control: 'NULLABLEBOOLEAN',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  id: '',
                  type: 'VALIDATION',
                  rule: {
                    expression: 'firstName.length > 1'
                  },
                  message: ''
                }
              ],
            } as IInterviewFieldDefinition,
            {
              name: 'person-details|dob',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'DATE',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {
                    expression: 'firstName.length > 1'

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition
          ]
        },
        {
          name: 'postal-address',
          displayName: 'Postal address',
          description: null,
          order: 1,
          fields: [
            {
              name: 'postal-address|street1',
              label: 'Street 1',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|street2',
              label: 'Street 2',
              description: undefined,
              metadata: {
                control: 'INPUT',
                placeholder: 'ex Suite, Apt'
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|country',
              label: 'Country',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|state',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'postal-address|city',
              label: 'City',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              validators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition
          ]
        }
      ]
    } as IInterviewCategoryDefinition,
    {
      name: 'studies-info',
      displayName: 'Studies',
      description: 'Area to detail the studies and certifications',
      order: 2
    } as IInterviewCategoryDefinition,
    {
      name: 'skills-info',
      displayName: 'Skills Test',
      description: 'Tecnical skills and its levels',
      order: 3
    } as IInterviewCategoryDefinition
  ]
};
