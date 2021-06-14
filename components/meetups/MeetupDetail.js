import Image from "next/image";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <Image src={props.image} alt={props.title} width={750} height={360} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </section>
  );
};

export default MeetupDetail;
