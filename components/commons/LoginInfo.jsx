import Image from "next/image";
import { Nav } from "./Nav";
import {signIn} from 'next-auth/react'


export const LoginInfo = ({information}) =>{

   return(
      <div>
         <Nav pageName={"Informacja"} />
            <div className="loginInfo">
               <h2>{information}</h2>
               <button onClick={() => signIn()}>
                  Zaloguj się 
               </button>
         </div>
      </div>
   )
}