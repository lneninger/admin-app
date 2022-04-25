export interface IWebHookEvent<T extends IWebHookEventBody> {
  previous_attributes: { [key: string]: string };
  object: T;
}

export interface IWebHookEventBody {
  id: string;
  object: string;
}

export interface IWebHookEventBodySubscription extends IWebHookEventBody {
  customer: string;
}
