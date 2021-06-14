import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import { connectDatabase } from "../utils";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse a list of meetups" />
      </Head>
      {!!props.meetups.length ? (
        <MeetupList meetups={props.meetups} />
      ) : (
        <h3>No meetups to display :(</h3>
      )}
    </Fragment>
  );
};

export const getStaticProps = async () => {
  try {
    const { client, db } = await connectDatabase();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
      props: {
        meetups: meetups.map(({ title, image, address, _id }) => ({
          title,
          image,
          address,
          id: _id.toString(),
        })),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
  }
};

export default HomePage;
