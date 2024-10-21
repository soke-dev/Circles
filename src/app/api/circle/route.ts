import { depositToCircle } from "@/lib/circle";
import { NextResponse } from "next/server";


export async function POST(req: any, res: any) {

     // const buffers = [];
     // for await (const chunk of req) {
     //      buffers.push(chunk);
     // }
     // const body = Buffer.concat(buffers).toString();
     const parsedBody = await req.json();

     const { circleId, wallet, amount } = parsedBody;
     console.log({ body: parsedBody });

     if (isNaN(amount)) {
          return NextResponse.json({ message: "Invalid amount value" });
     }

     console.log({ body: req.body });
     await depositToCircle({ circleId, wallet, amount });
     console.log({ body: req.body });
     return NextResponse.json({ message: `User deposited` });
}