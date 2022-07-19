import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewCategoryDefinition } from './../models/interview-category';
import { IInterviewFieldDefinition, IInterviewFieldMetadata } from './../models/interview-field';

export const vitae1: IInterviewDefinition = {
  id: 'vitae1',
  categories: [
    {
      name: 'personal_info',
      displayName: 'Personal Info',
      order: 1,
      description: 'Recolecting data like address, contact methods, etc',
      evaluators:[
        {
          type: 'VALIDATION',
          rule: {

          },
          message: ''
        }
      ],
      pages: [
        {
          name: 'personal_info.person_details',
          displayName: 'Personal details',
          description: null,
          fields: [
            {
              name: 'personal_info.person_details.firstName',
              label: 'First name',
              description: undefined,
              order: 1,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  id: 'required',
                  type: 'VALIDATION',
                  rule: {
                    // expression: '1 == 1'
                    // expression: 'personal_info.person_details.firstName != null and length(trim(personal_info.person_details.firstName)) > 0'
                    expression: 'not empty(personal_info.person_details.firstName)'
                  },
                  message: 'First name is required'
                },
                {
                  id: 'gt-2',
                  type: 'VALIDATION',
                  rule: {
                    expression: 'length(personal_info.person_details.firstName) > 2'
                  },
                  message: 'First name most be greater that 2 char length'
                },

              ],
            } as IInterviewFieldDefinition,
            {
              name: 'personal_info.person_details.lastName',
              label: 'Last name',
              description: undefined,
              order: 1,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  id: 'required',
                  type: 'VALIDATION',
                  rule: {
                    expression: 'personal_info.person_details.lastName != null && length(trim(personal_info.person_details.lastName)) > 0'
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
              name: 'personal_info.person_details.gender',
              label: 'Gender',
              description: undefined,
              order: 1,
              metadata: {
                control: 'NULLABLEBOOLEAN',
              } as IInterviewFieldMetadata,
              evaluators:[
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
              name: 'personal_info.person_details.dob',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'DATE',
              } as IInterviewFieldMetadata,
              evaluators:[
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
          name: 'personal_info.postal-address',
          displayName: 'Postal address',
          description: null,
          order: 1,
          fields: [
            {
              name: 'personal_info.postal-address.street1',
              label: 'Street 1',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'personal_info.postal-address.street2',
              label: 'Street 2',
              description: undefined,
              metadata: {
                control: 'INPUT',
                placeholder: 'ex Suite, Apt'
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'personal_info.postal-address.country',
              label: 'Country',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'personal_info.postal-address.state',
              label: 'Date of birth',
              description: undefined,
              metadata: {
                control: 'SELECT',
              } as IInterviewFieldMetadata,
              evaluators:[
                {
                  type: 'VALIDATION',
                  rule: {

                  },
                  message: ''
                }
              ]
            } as IInterviewFieldDefinition,
            {
              name: 'personal_info.postal-address.city',
              label: 'City',
              description: undefined,
              metadata: {
                control: 'INPUT',
              } as IInterviewFieldMetadata,
              evaluators:[
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
