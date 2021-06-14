import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();
  const onAddMeetupHandler = async (newMeetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>New meetup</title>
        <meta name="description" content="Add a new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
