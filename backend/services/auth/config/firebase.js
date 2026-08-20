import admin,{cert} from "firebase-admin";
// import path from "path";
import  serviceAccount from "../../auth/serviceAccountKey.json" with {type:"json"};

export const app=admin.initializeApp({
  credential: cert(serviceAccount)
});
  