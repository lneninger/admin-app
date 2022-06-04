import { IInterviewCategory } from './../models/interview-category';
import { IExecutingInterview } from '../models/executing-interview';

export const vitae1: IExecutingInterview = {
  id: 'vitae1',
  categories: [
    {
      id: 'personal-info',
      name: 'Personal Info',
      displayName: 'Personal Info',
      description: 'Recolecting data like address, contact methods, etc',
      pages:[
        {
          id: 'postalAddresses',
          name: 'postalAddresses',
          displayName: 'PostalAddresses',
          description: null
        }
      ]
    } as IInterviewCategory,
    {
      id: 'studies-info',
      name: 'Studies',
      displayName: 'Studies',
      description: 'Area to detail the studies and certifications'
    } as IInterviewCategory,
    {
      id: 'skills-info',
      name: 'skills',
      displayName: 'Skills',
      description: 'Tecnical skills and its levels'
    } as IInterviewCategory
  ]
};
