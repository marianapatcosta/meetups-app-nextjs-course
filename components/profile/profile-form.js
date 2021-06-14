import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./profile-form.module.css";

const ProfileForm = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <Card className={classes.profile}>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
