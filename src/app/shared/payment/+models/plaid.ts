export interface PlaidEvent {
  eventName: string;
  metadata: {
    error_code: string
    error_message: string
    error_type: string
    exit_status: string
    institution_search_query: string
    link_session_id: string
    mfa_type: string
    request_id: string
    timestamp: Date
    view_name: string
  }
}


export interface PlaidSuccess {
  token: string;
  metadata: {
    institution:
    {
      name: string,
      institution_id: string
    },
    account: IPlaidBankAccount,
    account_id: string,
    accounts: IPlaidBankAccount[],
    link_session_id: string,
    public_token: string
  }
}

export interface IPlaidBankAccount {
  id: string,
  name: string,
  mask: string,
  type: string,
  subtype: string
}


//#region Requests
export interface IPlaidLinkTokenRequestModel{
  appName: string;
  stripeCustomerId: string;
}
export interface IPlaidLinkTokenResponseModel{
  linkToken: string;
}
export interface IPlaidStripeRequestModel{
  accountId: string;
  publicToken: string;
  customerId?: string;
}

export interface IPlaidStripeResponseModel{
  bankAccountToken: string;
}

export interface ICreateSourceResponseModel{

}
//#endregion
