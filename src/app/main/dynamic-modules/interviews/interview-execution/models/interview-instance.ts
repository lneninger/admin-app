export interface IInterviewInstance {
  id: string;
  currentCategory: string;
  currentPage: string;
  maxVisitedCategory: string;
  maxVisitedPage: string;
  fieldValues: { [key: string]: any };
}
