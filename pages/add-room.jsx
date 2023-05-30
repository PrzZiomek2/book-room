import { Nav } from "@components/commons/Nav";
import React, { useState } from "react";
import { ImageSelect } from "../components/add-room-page/ImageSelect";
import { randomIntFromSpan } from "utils/randomFromSpan";
import { useSession } from "next-auth/react";
import { LoginInfo } from "@components/commons/loginInfo";


export default function AddRoom(){
   
   const session = useSession();
   const [uploadedImages, setUploadedImages] = useState();

   console.log({session});

   const handleAddRoomSubmit = async (e) => {
      e.preventDefault();
      const inputs = e.target;

      if(!uploadedImages) return;

      const res = await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          name: inputs.name.value, 
          description: inputs.description.value, 
          maxCount: 3,
          opinionsCount: randomIntFromSpan(10, 500), 
          rating: randomIntFromSpan(1, 10),
          cost: inputs.cost.value, 
          image: uploadedImages, 
          type: inputs.type.value,       
        }),
      }).catch(err => console.log("err when posting room", err));
  
      const resJson = await res.json(); 
      if(resJson.insertedId) console.log("added successfully");
    };

   return(
      session.status === "authenticated" ?
      <div>
         <Nav pageName={"Dodaj Pokój"} />
         <div className="form_wrapper">
            <form className="form" onSubmit={handleAddRoomSubmit} encType="multipart/form-data">
               <div className="form-group">
                  <label htmlFor="name">Nazwa</label>
                  <input type="text" className="form-control" name="name" id="name" />
               </div>

               <div className="form-group">
                  <label htmlFor="file">Zdjęcie</label>
                  <ImageSelect setUploadedImages={setUploadedImages} />
               </div>

               <div className="form-group">
                  <label htmlFor="description">Opis</label>
                  <textarea name="description" id="description" className="form-control" placeholder="" rows="10"></textarea>
               </div>

               <div className="form-group">
                  <label htmlFor="cost">Cena</label>
                  <input type="number" name="cost" value={300} className="form-control" id="cost" />
               </div>

               <div className="form-group">
                  <label htmlFor="type">typ</label>
                  <select name="type" id="type" className="form-control">
                     <option value="basic">Basic</option>
                     <option value="premium">Premium</option> 
                  </select>
               </div>

               <button className="btn btn-outline-success btn-lg" type="submit">Zapisz</button>
            </form>
         </div>
      </div>
      : <LoginInfo information={"aby móc dodawać obiekty należy być zalogowanym"} />
   )
}
