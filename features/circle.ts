import Utils from "@/lib/util";
import { _fDb } from "../src/lib/firebase";

export class Circle {

     id: string;
     name: string;
     noOfParticipants: number;
     totalSaved: number;
     isPrivate: false;
     description: string;
     createdAt: number | Date;
     updatedAt: number | Date;

     creator: string;

     constructor(arg: { name: string, isPrivate?: false, noOfParticipants?: number, creator?: string, totalSaved?: number, description: string, createdAt?: number, updatedAt?: number }) {
          this.id = Utils.cleanString(arg.name);
          this.name = arg.name;
          this.isPrivate = arg.isPrivate ?? false;
          this.description = arg.description;
          this.noOfParticipants = arg?.noOfParticipants ?? 0;
          this.totalSaved = arg.totalSaved ?? 0;
          this.creator = arg.creator ?? "system";
          this.createdAt = arg.createdAt ?? _fDb.FieldValue.serverTimestamp() as any;
          this.updatedAt = arg.updatedAt ?? _fDb.FieldValue.serverTimestamp() as any;
     }

     get json() {
          return {
               id: this.id,
               name: this.name ?? '',
               isPrivate: this.isPrivate ?? false,
               noOfParticipants: this.noOfParticipants,
               totalSaved: this.totalSaved,
               description: this.description,
               creator: this.creator,
               createdAt: this.createdAt,
               updatedAt: this.updatedAt
          }
     }
}
