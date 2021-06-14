import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

const UserProfile = () => {
  // client-side session guard; it is more elegant to do this on server side

  // with useSession, loading is always true and session may never change if we are logout, so to guard route we use getSession
  /*  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        return (window.location.href = "/auth");
      }
      setIsLoading(false);
    });
  }, []);


  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  } */

  const handleChangePassword = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ ...passwordData }),
      headers: {
        "Content-Type": "application(json",
      },
    });

    console.log(response);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
};

export default UserProfile;
