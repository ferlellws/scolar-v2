// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //API: 'http://localhost:5000',
  API: 'http://localhost:3000',
  widthFormsModal: '80%',
  widthFormsLittleModal: '50%',

  // API: 'http://localhost:3000',
  consoleMessage(dataShow: any, strLabel: string = "") {
    if (strLabel != "") {
      console.log(strLabel, dataShow);
    } else {
      console.log({dataShow});
    }
  }

};

// export function consoleMessage(dataShow: string, strLabel: string = "") {
//   if (strLabel != "") {
//     console.log(strLabel, dataShow);
//   } else {
//     console.log({dataShow});
//   }
// }

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
