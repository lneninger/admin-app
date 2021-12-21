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
    view_name:string
  }
}


export interface PlaidSuccess{
  token: string;
  metadata: {
    "institution":
      {
        "name":"Bank of America",
        "institution_id":"ins_127989"
      },
      "account":{
        "id":null,"name":null,"type":null,"subtype":null,"mask":null},
        "account_id":null,
        "accounts":[
          {"id":"AaeJrkkg9yiZRwDmWB5Nu854voee6qu13EGZ7","name":"Plaid Checking","mask":"0000","type":"depository","subtype":"checking"},
          {"id":"GepJaxxqkKi5B6v8JAzLf8ZVbEoomxu1RyEma","name":"Plaid Saving","mask":"1111","type":"depository","subtype":"savings"}
        ],
        "link_session_id":"392c062f-e918-483c-9852-40c6132e828d",
        "public_token":"public-sandbox-9d0da8dd-d69d-4d53-836a-84762133847f"
      }
}
