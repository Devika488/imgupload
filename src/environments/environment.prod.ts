import { firebaseConfig } from '../environments/environment';
import { apiPaths } from '../environments/environment';

export const environment = {
  production: true,
  baseUrl: 'https://serene-hollows-11661.herokuapp.com/api/v1',
  firebaseConfig: {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId,
  },
  apiPaths: {
    signup: apiPaths.signup,
    signin: apiPaths.signin,
  },
};
