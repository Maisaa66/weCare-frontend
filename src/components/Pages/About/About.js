import React from "react";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer/Footer";
import classes from "./About.module.css";
const AboutPage = () => {
  return (
    <div className={classes.about}>
      <NavBar></NavBar>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-start">
            <h1>About weCare</h1>
            <p>
              weCare is a specialized healthcare service provider that connects
              users with qualified professionals to meet their specific
              healthcare needs. Our dedicated team of nurses, companions,
              physiotherapists, autism specialists, ADHD specialists,
              Alzheimer's specialists, and nannies for children ensure the
              highest level of care and support for our clients.
            </p>
            <p>
              At weCare, we understand that every individual has unique
              requirements when it comes to healthcare. Whether you're looking
              for assistance with daily tasks, therapeutic support, specialized
              care for neurological conditions, or childcare services, we have a
              diverse range of professionals ready to serve you.
            </p>
            <h2>Our Team</h2>
            <p>
              Our team of nurses is experienced in providing medical care,
              administering medications, and monitoring vital signs. They offer
              personalized care plans tailored to your specific needs, ensuring
              your comfort and well-being.
            </p>
            <p>
              Our companions provide emotional support, engage in meaningful
              conversations, and assist with daily activities. They are here to
              make your life easier and more enjoyable.
            </p>
            <p>
              Our physiotherapists are skilled in helping patients recover from
              injuries, manage chronic pain, and improve mobility. They design
              personalized exercise programs to enhance strength, flexibility,
              and overall wellness.
            </p>
            <p>
              We also have specialists in autism, ADHD, and Alzheimer's who are
              trained to provide specialized care and support to individuals
              with these conditions. They have extensive knowledge and
              experience in managing the unique challenges associated with these
              neurological conditions.
            </p>
            <p>
              Additionally, we offer professional nannies who provide safe and
              nurturing care for your children. They ensure a stimulating and
              secure environment, promoting their growth and development.
            </p>
            <h2>Mission</h2>
            <p>
              Our mission is to provide personalized and compassionate care,
              ensuring the well-being and comfort of our clients. We prioritize
              building strong relationships based on trust, professionalism, and
              reliability.
            </p>
            <p>
              Contact us today to learn more about how weCare can help you or
              your loved ones with their healthcare needs. Our team is ready to
              assist you and provide the highest quality of care.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AboutPage;
