import Link from 'next/link';
import {Menu} from '../components/commons/Menu';
import { useRouter } from 'next/router';
import {signIn, signOut, useSession} from 'next-auth/react'


export default function Home() {

  const session = useSession();
  const router = useRouter();
  const currentRoute = router.pathname;
  const handleLogin = session.status === "authenticated" ? signOut : signIn;

  return (
        <Menu header={"BookRoom"}>
          <li className={`nav-link ${currentRoute === "/" ? 'active' : ''}`}>
            <Link aria-current="page" href="/">
              Start
            </Link>
          </li>
          <li  className={`nav-link ${currentRoute === "/login" ? 'active' : ''}`}>
            <a onClick={() => handleLogin()}>
                {session.status === "authenticated" ? "Wyloguj się" : "Zaloguj się"} 
            </a>
          </li>
          <li className={`nav-link ${currentRoute === "/rooms" ? 'active' : ''}`}>
            <Link aria-current="page" href="/rooms">
                Pokoje
            </Link>
          </li>
          <li className={`nav-link ${currentRoute === "/add-room" ? 'active' : ''}`}>
            <Link href="/add-room">
              Dodaj pokój
            </Link>
          </li>
        </Menu>
  );
}

