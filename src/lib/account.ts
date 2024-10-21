'use server'
import Encrypt from "./encrypt";
import { CollectionNames, fDb } from "./firebase";



export type Profile = {
     name: string;
     avatar: string;
     wallet: string;
     twitter: string | null;
     discord: string | null;
     currency: string;
     createdAt: Date | number;
     updatedAt: Date | number;
     deletedAt: Date | number | null;
}



async function getNewProfile(walletHash: string) {
     const data = await fetch(`https://randomuser.me/api/?seed=${walletHash}`)
     const { results } = await data.json();
     const name = results[0].name.first + " " + results[0].name.last;
     const email = results[0].email;
     const avatar = results[0].picture.thumbnail;
     return { name, avatar: getAvatar() };
}

function getAvatar(): string {
     const id = Math.floor(Math.random() * 50)
     return `https://avatar.iran.liara.run/public/${id}`;
}

export async function createAccount(wallet: string): Promise<Profile> {
     console.log("Creating new account for ", wallet)
     const bio = await getNewProfile(wallet);
     const profile: Profile = {
          ...bio,
          wallet,
          currency: 'USD',
          twitter: null,
          discord: null,
          createdAt: Date.now(), updatedAt: Date.now(), deletedAt: null
     };
     await fDb.collection(CollectionNames.profiles).doc(wallet).set(profile);
     return profile;
}

export async function updateAccount(wallet: string, { twitter, discord, name }: { name: string, twitter: string, discord: string }): Promise<Profile> {
     console.log("Updating new account for ", wallet)
     const profile: Partial<Profile> = {
          name,
          twitter,
          discord,
          updatedAt: Date.now(),
     };
     await fDb.collection(CollectionNames.profiles).doc(wallet).update(profile);
     return (await getAccount(wallet) as Profile);
}



export async function getAccount(wallet?: string): Promise<Profile | null> {
     if (!wallet) return null;
     const doc = await fDb.collection(CollectionNames.profiles).doc(wallet).get();
     if (!doc.exists) return null;
     return doc.data() as Profile;
}
