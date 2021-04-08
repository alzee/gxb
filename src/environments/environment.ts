// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export enum FinanceType {
    topup = 1,
    // postTask = 2,
    pay = 2,
    wxpay = 4
}

export enum GxbType {
    collect = 1,
}

const url = 'http://b.gxb';
export const environment = {
  production: false,
  smsPass: 'test',
  apiUrl: url + '/api/',
  imgUrl: url + '/uploads/files/img/',
  url,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
