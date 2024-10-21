import { LOGO_URL } from "@/app/config";
import { _fDb, CollectionNames, fDb } from "./firebase";
import { Network } from "./network";
import Utils from "./util";
import Encrypt from "./encrypt";


export type CircleCategory = "Country" | "City" | "State" | "Region" | "Continent" | "Custom" | "User";

export type Circle = {

     id: string;
     name: string;
     noOfParticipants: number;
     totalSaved: number;
     description: string;

     category: CircleCategory;

     image: string;

     createdAt: number;
     updatedAt: number;

     creator: string;

     isPrivate: boolean;
}

export const Circle = async (arg: { name: string, isPrivate?: false, category?: string, image?: string, noOfParticipants?: number, creator?: string, totalSaved?: number, description: string, createdAt?: number, updatedAt?: number }) => {
     return {
          id: Utils.cleanString(arg.name),
          name: arg.name,
          noOfParticipants: arg?.noOfParticipants ?? 0,
          isPrivate: arg.isPrivate ?? false,
          totalSaved: arg.totalSaved ?? 0,
          description: arg.description,
          creator: arg.creator ?? "system",
          category: arg.category ?? "Custom",
          image: arg.image ?? LOGO_URL,
          createdAt: arg.createdAt ?? Date.now(),
          updatedAt: arg.updatedAt ?? Date.now(),
     }
}


async function createCircle(arg: Circle) {
     const exist = await getCircle(arg.id);
     if (exist) return exist;
     await fDb.collection(CollectionNames.circles).doc(arg.id).set(arg);
}

export async function getAllCircles(page = 1, limit = 10): Promise<Circle[]> {
     const results = await fDb.collection(CollectionNames.circles).limit(limit).offset((page - 1) * limit).get();
     return results.docs.map((doc: any) => {
          return doc.data() as any;
     });
}

export async function getCircle(arg: string): Promise<Circle> {
     const id = Utils.cleanString(arg);
     const doc = await fDb.collection(CollectionNames.circles).doc(id).get();
     return (doc.data() as any)
}



export async function joinCircle(circleId: string, userId: string) {
     const id = Utils.cleanString(circleId + userId);
     const doc = await fDb.collection(CollectionNames.network).doc(id).set({
          uid: userId,
          circle: circleId,
          totalSaved: 0,
          createdAt: Date.now()
     });
}

export async function getIsUserInCircle(circleId: string, userId: string): Promise<Network | null> {
     const id = Utils.cleanString(circleId);
     const doc = await fDb.collection(CollectionNames.network).where("uid", "==", userId).where("circle", "==", id).get();
     if (doc.docs.length == 0) return null;
     return doc.docs[0].data() as Network;
}

export async function getUserCircles(wallerId: string, page = 1, limit = 10): Promise<Circle[]> {
     const results = await fDb.collection(CollectionNames.network).where("uid", "==", wallerId).limit(limit).offset((page - 1) * limit).get();
     return results.docs.map((doc: any) => {
          return doc.data() as any;
     });
}


export async function getTreadingCircles(): Promise<Array<Circle>> {
     // const ids = [
     //      "Anyone can save 🔥",
     //      "Nigerians can save 🇳🇬",
     //      " Ghana 🇬🇭",
     //      "Based Savers",
     //      "United Kingdom",
     //      "Freelancers",
     //      "Entrepreneurs",
     //      "Developers Circle"]
     // const results: Circle[] = [];
     // for (const id of ids) {
     //      const circle = await getCircle(id)
     //      if (!circle) {
     //           const e = { name: id, description: `Join ${id} national leaderboard`, image: LOGO_URL }
     //           await createCircle(circle)
     //      };
     //      results.push(circle);
     // }
     // return results;
     return [];
}


export async function depositToCircle(arg: { circleId: string, wallet: string, amount: number }) {
     const { amount: amt, circleId, wallet } = arg;
     const amount = Number(amt);
     const payload = {
          id: Encrypt.hash(wallet + circleId + Date.now(), 'md5'),
          amount: amount,
          type: "deposit",
          wallet: wallet,
          circle: circleId,
          createdAt: Date.now(),
     }
     const networkId = Utils.cleanString(circleId + wallet);
     const batch = fDb.batch();
     // update network
     batch.set(fDb.collection(CollectionNames.network).doc(networkId), {
          uid: Utils.cleanString(circleId + wallet),
          circle: circleId,
          createdAt: Date.now(),
          totalSaved: _fDb.FieldValue.increment(amount)
     }, { merge: true });

     // update circle
     batch.update(fDb.collection(CollectionNames.circles).doc(circleId), { noOfParticipants: _fDb.FieldValue.increment(1), totalSaved: _fDb.FieldValue.increment(amount) });

     // create record
     batch.set(fDb.collection(CollectionNames.transactions).doc(payload.id), payload);

     await batch.commit();
}


export async function getLeaderBoard(circleId: string) {
     await fDb.collection(CollectionNames.network).where("circle", "==", circleId).get();
}