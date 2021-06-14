import Head from "next/head";
import { ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import { connectDatabase } from "../../utils";

const MeetupDetails = (props) => {
  // if  fallback: true, in the return object of getStaticPath
  /* 
  if (!props.meetupData) {
    return <p>Loading...</p>

  } */

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  try {
    const { client, db } = await connectDatabase();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  try {
    const { client, db } = await connectDatabase();
    const meetupsCollection = db.collection("meetups");
    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    if (!meetup) {
      /*  return {
        redirect: {
          destination: "no-data",
        },  
      }; */
      return { notFound: true };
    }

    return {
      props: {
        meetupData: {
          title: meetup.title,
          description: meetup.description,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        },
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
  }
};

export default MeetupDetails;
