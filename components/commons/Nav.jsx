import Image from "next/image";

import arrBack from '@public/left-arrow-back.svg';
import home from '@public/home.svg';
import { useRouter } from "next/router";
import Link from "next/link";


export const Nav = ({pageName}) =>{

   const router = useRouter();

   return(
      <nav className="title_nav">
        <div className="title_nav-img">
          <Image onClick={() => router.back()} src={arrBack} alt="zdjęcie pokoju" />
        </div>
        <h2 className="rooms_title">{pageName}</h2>
        <div className="nav-home-img">
          <Link href={"/"} passHref>
            <Image src={home} alt="zdjęcie pokoju" />
          </Link>
        </div>
    </nav>
   )
}