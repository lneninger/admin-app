export interface IWebHookEvent<T extends any>{
  id: string;
  object: T;
}
