import admin,{cert} from "firebase-admin";
import  serviceAccount from "path/to/serviceAccountKey.json" with {type:"json"};

export const app=admin.initializeApp({
  credential: cert(serviceAccount)
});
