import { Nav } from "@components/commons/Nav";
import React, { useState } from "react";


export default function AddRoom(){
   
   const [uploadedImages, setUploadedImages] = useState();

   const handleAddRoomSubmit = async (e) => {
      e.preventDefault();
      const inputs = e.target;

     /* const res = await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        body: JSON.stringify({
         
          type: inputs.type.value,       
        }),
      }).catch(err => console.log("err when logging", err));
  
      const resJson = await res.json(); 
      if(resJson.insertedId) console.log("added successfully");
      */
    };

   return(
      <div>
         <Nav pageName={"Rejestracja"} />
         <div className="form_wrapper">
            <form className="form" onSubmit={handleAddRoomSubmit} encType="multipart/form-data">
               <div className="form-group">
                  <label htmlFor="name">Imię i nazwisko</label>
                  <input type="text" className="form-control" name="name" id="name" />
               </div>

               <div className="form-group">
                  <label htmlFor="name">Email</label>
                  <input type="email" className="form-control" name="email" id="email" />
               </div>

               <div className="form-group">
                  <label htmlFor="name">Hasło</label>
                  <input type="password" className="form-control" name="password" id="password  " />
               </div>

               <button className="btn btn-outline-success btn-lg" type="submit">Zapisz</button>
            </form>
         </div>
      </div>
   )
}
