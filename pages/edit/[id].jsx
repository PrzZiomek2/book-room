import { Nav } from "@components/commons/Nav";
import React, { useState } from "react";
import { ImageSelect } from "../../components/add-room-page/ImageSelect";
import { randomIntFromSpan } from "utils/randomFromSpan";
import { useSession } from "next-auth/react";
import { LoginInfo } from "@components/commons/loginInfo";
import { useRouter } from "next/router";


export default function EditRoom({room}){

   const session = useSession();
   const router = useRouter();

   const [uploadedImages, setUploadedImages] = useState();
   const [inputValues, setInputValues] = useState({
      name: room.name,
      image: room.image,
      description: room.description,
      cost: room.cost, 
      type: room.type
   });

   console.log({session});

   const handleChange = ({target}) => setInputValues({ [target.name]: target.value });

   const handleAddRoomSubmit = async (e) => {
      e.preventDefault();
      const inputs = e.target;

      if(!uploadedImages) return;

      const res = await fetch("http://localhost:3000/api/rooms", {
        method: "PUT",
        body: JSON.stringify({
          id: room._id,
          name: inputs.name.value, 
          description: inputs.description.value, 
          maxCount: 3,
          opinionsCount: randomIntFromSpan(10, 500), 
          rating: randomIntFromSpan(1, 10),
          cost: inputs.cost.value, 
          image: uploadedImages, 
          type: inputs.type.value,       
        }),
      }).catch(err => console.log("err when updating room", err));
  
      const resJson = await res.json(); console.log({resJson});
      if(resJson.data.modifiedCount){
         router.push("/rooms");
      }
    };

    return(
      session.status === "authenticated" ?
      <div>
         <Nav pageName={"Edytuj Pokój"} />
         <div className="form_wrapper">
            <form className="form" onSubmit={handleAddRoomSubmit} encType="multipart/form-data">
               <div className="form-group">
                  <label htmlFor="name">Nazwa</label>
                  <input type="text" className="form-control" name="name" id="name" value={inputValues.name} onChange={handleChange}/>
               </div>

               <div className="form-group">
                  <label htmlFor="file">Zdjęcie</label>
                  <ImageSelect setUploadedImages={setUploadedImages} currentImage={`http://localhost:3000/${inputValues.image}`} />
               </div>

               <div className="form-group">
                  <label htmlFor="description">Opis</label>
                  <textarea name="description" id="description" className="form-control" onChange={handleChange} value={inputValues.description} placeholder="" rows="10"></textarea>
               </div>

               <div className="form-group">
                  <label htmlFor="cost">Cena</label>
                  <input type="number" name="cost" value={inputValues.cost} className="form-control" id="cost" />
               </div>

               <div className="form-group">
                  <label htmlFor="type">typ</label>
                  <select name="type" defaultValue={inputValues.type} id="type" className="form-control">
                     <option value="basic">Basic</option>
                     <option value="premium">Premium</option> 
                  </select>
               </div>

               <button className="btn btn-outline-success btn-lg" type="submit">Zapisz</button>
            </form>
         </div>
      </div>
      : <LoginInfo information={"aby móc edytować obiekty należy być zalogowanym"} />
   )
}


export const getServerSideProps = async ({params}) => {
   const res = await fetch(`http://localhost:3000/api/${params.id}`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     },
   });

   const room = await res.json();

   return {
     props: {
       room: room.data,
     },
   };
 
 };
 