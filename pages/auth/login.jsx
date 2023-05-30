import { Nav } from "@components/commons/Nav";
import React, { useState } from "react";
import {signIn} from 'next-auth/react'

export default function Login(){

   const handleAddRoomSubmit = async (e) => {
      e.preventDefault();
      const inputs = e.target;

      await signIn({
         email: inputs.email.value, 
         password: inputs.password.value,
         callbackUrl: `${window.location.origin}/`
      })
    };

   return(
      <div>
         <Nav pageName={"Logowanie"} />
         <div className="form_wrapper">
            <form className="form" onSubmit={handleAddRoomSubmit}>           
            <div className="form-group">
                  <label htmlFor="email">Login</label>
                  <input type="email" className="form-control" name="email" id="email" />
               </div>
               <div className="form-group">
                  <label htmlFor="name">Hasło</label>
                  <input type="password" className="form-control" name="password" id="password" />
               </div>
               <button className="btn btn-outline-success btn-lg" type="submit">Zaloguj</button>
            </form>
         </div>
      </div>
   )
};



