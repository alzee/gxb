export enum FinanceType {
    topup = 1,
    pay,
}

const url = 'https://backend.drgxb.com';
export const environment = {
  production: true,
  smsPass: '111',
  apiUrl: url + '/api/',
  imgUrl: url + '/uploads/files/img/',
  url
};
