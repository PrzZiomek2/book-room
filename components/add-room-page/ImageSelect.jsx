import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export const ImageSelect = ({setUploadedImages}) =>{

   const router = useRouter();
   const [uploading, setUploading] = useState(false);
   const [selectedImg, setSelectedImg] = useState("");
   const [selectedFile, setSelectedFile] = useState();
   const [isUploaded, setIsUploaded] = useState(false);

   useEffect(() => {
      setIsUploaded(false);
   }, [selectedImg])

   const handleUpload = async () => {
      setUploading(true);

      if(!selectedFile) return;

      const formData = new FormData(); 
      formData.append("image", selectedFile);

      const res = await axios("http://localhost:3000/api/images", {
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .catch(err => console.log("err when adding image", err));

      setUploading(false);

      if(res.status === 200){
        setUploadedImages(res?.data.image.originalFilename);
        setIsUploaded(true);
      }
   }

   return(
    <div className="imageSelect">
      <label>
        <input
            type="file" 
            name="image" 
            className="form-control" 
            id="file" 
            hidden
            onChange={({target}) => {
              if(!target.files) return;
              const file = target.files[0];

              setSelectedImg(URL.createObjectURL(file));
              setSelectedFile(file)
            }}
        />
        <span className="select">Wybierz</span>
       </label>
      <div className="img-wrap">
        {selectedImg && (
            <Image 
              className="uploaded_img"
              unoptimized={true} 
              src={selectedImg} 
              width={400} 
              height={300} 
              alt="dodawane zdjecie"
            />
            )}
      </div>
      <div className="button">
        <button 
          disabled={uploading}
          onClick={handleUpload}
          style={{opacity: uploading ? ".5" : "1"}}
        >
          {uploading ? "Przesyłanie..." : isUploaded ? "Przesłano" : "Prześlij"}
        </button>
      </div>
    </div>
   )
}