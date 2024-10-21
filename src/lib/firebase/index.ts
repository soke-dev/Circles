import { cert } from 'firebase-admin/app'
import admin from "firebase-admin"
import 'firebase/firestore'
import 'firebase/storage'




let serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
     throw new Error("Missing env: FIREBASE_SERVICE_ACCOUNT");
}
serviceAccount = serviceAccount.replaceAll("\n", "");

serviceAccount = serviceAccount.replaceAll("\\\\", "\\");

console.log("serviceAccount loaded")

const SERVICE_ACCOUNT = JSON.parse(serviceAccount);

if (admin.apps.length === 0) {

     admin.initializeApp({
          credential: cert(SERVICE_ACCOUNT),
     });
}
const db = admin.firestore();


export const fAuth = admin.auth();
export const fDb = admin.firestore();
export const _fDb = admin.firestore;



export const CollectionNames = {
     profiles: "profiles",
     circles: "circles",
     transactions: "transactions",
     network: "network",
     leaderboard: "leaderboard",
};
