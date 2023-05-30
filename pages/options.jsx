import { Menu } from "@components/commons/Menu";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Options(){

   const router = useRouter();
   const currentRoute = router.pathname;

   return(
      <Menu header={"Opcje"}>
         <li className={`nav-link ${currentRoute === "/options/add-room" ? 'active' : ''}`}>
            <Link aria-current="page" href="/options/add-room">
               Dodaj
            </Link>
         </li>
         <li  className={`nav-link ${currentRoute === "/edit-room" ? 'active' : ''}`}>
            <Link aria-current="page" href="/edit-room">
                  Usuń  
            </Link>
         </li>
         <li className={`nav-link ${currentRoute === "/remove-room" ? 'active' : ''}`}>
            <Link aria-current="page" href="/remove-room">
                  Zmień
            </Link>
         </li>
    </Menu>
   )
}
