import { Circle, getTreadingCircles } from "@/lib/circle"
import { useEffect, useState } from "react"
import { SidebarHeading, SidebarItem, SidebarSection } from "./sidebar"




// export async function getServerSideProps() {
//      // Your server-side logic
//      const data = await getTreadingCircles();

//      return {
//           props: { data }, // Pass data to the page via props
//      };
// }


export default async function TreadingCircles() {



     const data = await getTreadingCircles();

     const getData = async () => {
          // const data = await getTreadingCircles().then((e) => setState(e as any));
     }




     return <>
          <SidebarSection className="max-lg:hidden">
               <SidebarHeading>Trending Circles</SidebarHeading>
               {data.map((e) => (
                    <SidebarItem key={e.id} href={e.id}>
                         {e.name}
                    </SidebarItem>
               ))}
          </SidebarSection>
     </>
}