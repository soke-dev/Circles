'use client';
import { Button } from '@/components/button';
import { CldUploadButton } from 'next-cloudinary';
import React from 'react'

export default function UploadImage() {


     const onUploadImage = (e: any) => {

          console.log(e);
     }


     return (
          <div>
               <center>

                    <CldUploadButton onPublicId={onUploadImage} uploadPreset="12345678921" >

                         <Button>Upload Circle Logo</Button>

                    </CldUploadButton>
               </center>
          </div>
     )
}
