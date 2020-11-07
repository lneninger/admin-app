import { InterviewContext } from './interview.models';
import { TemplateService } from './template.service';
import { VariableTemplatingService } from './variable-templating.service';


export class InterviewManager {
  private _interviewContext: InterviewContext;

    public variableTemplatingService: VariableTemplatingService;
    templateService: TemplateService;
    templateFactoryService: any;

    get interviewContext() {
      return this._interviewContext;
  }
}
