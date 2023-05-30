import { Nav } from "@components/commons/Nav";
import React, { useEffect, useState } from "react";
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from "next/router";


export default function Login(){

   const router = useRouter();
   const session = useSession();

   useEffect(() => {
      if(session.status === "authenticated"){
         router.push("/");
      }
   }, [session, router])

   const handleAddRoomSubmit = async (e) => {
      e.preventDefault();
      const inputs = e.target;

      await signIn({
         email: inputs.email.value, 
         password: inputs.password.value,
      });

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



