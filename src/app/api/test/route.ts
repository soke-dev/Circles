import { NextRequest, NextResponse } from "next/server";
import { CollectionNames, fDb } from "../../../lib/firebase";
import { Circle } from "../../../lib/circle";
import { getCountries } from "@/app/data";

const circles = [
     {
          "capital": "Abuja",
          "code": "ng",
          "continent": "Africa",
          "flag_1x1": "flags/1x1/ng.svg",
          "flag_4x3": "flags/4x3/ng.svg",
          "iso": true,
          "name": "Nigeria"
     },
     {
          "capital": "Accra",
          "code": "gh",
          "continent": "Africa",
          "flag_1x1": "flags/1x1/gh.svg",
          "flag_4x3": "flags/4x3/gh.svg",
          "iso": true,
          "name": "Ghana"
     }, {
          "capital": "Pretoria",
          "code": "za",
          "continent": "Africa",
          "flag_1x1": "flags/1x1/za.svg",
          "flag_4x3": "flags/4x3/za.svg",
          "iso": true,
          "name": "South Africa"
     },
].map((country) => {

     return new Circle({ name: country.name, description: `Join ${country.name} national leaderboard`, image: `./flags/${country.code}.svg` })
})


export async function GET(req: NextRequest, res: any) {




     console.log(circles.length,)
     // console.log(circle.json)
     // await fDb.collection(CollectionNames.circles).doc(circle.name).set(circle.json);

     await circles.forEach(async (circle) => {
          await fDb.collection(CollectionNames.circles).doc(circle.id).set(circle.json);
     })



     return NextResponse.json({ ok: true, data: circles[0] });

}