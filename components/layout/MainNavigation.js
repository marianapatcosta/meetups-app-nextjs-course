import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {!!session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {!!session && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
