export interface SubscriptionUIEvent{
  type: SubscriptionUIEventType,
  action: string
}

export enum SubscriptionUIEventType{
  cancelAction = 'cancelAction',
  closeAction = 'closeAction',
}
