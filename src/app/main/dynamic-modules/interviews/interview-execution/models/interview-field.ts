export interface IInterviewField {
  id: string;
  label: string;
  description: string;
  control: string;
  metadata: any;
}

export class InterviewField implements IInterviewField {
  id: string;
  label: string;
  description: string;
  control: string;
  metadata: any;

  constructor(input: Partial<IInterviewField>) {
    Object.assign(this, input);
  }
}

