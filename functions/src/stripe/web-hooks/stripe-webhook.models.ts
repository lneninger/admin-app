export interface IWebHookEvent<T extends IWebHookEventBody> {
  id: string;
  type: string;
  object: string;
  data: {
    previous_attributes: { [key: string]: string };
    object: T;
  }
}

export interface IWebHookEventBody {
  id: string;
  object: string;
}

export interface IWebHookEventBodySubscription extends IWebHookEventBody {
  customer: string;
}
