import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

const ProfilePage = () => <UserProfile />;

// server-side session guard
export const getServerSideProps = async (context) => {
  // get session extracts the cookie and checks if user is logged in
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
