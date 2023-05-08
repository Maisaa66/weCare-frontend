import React from "react";
import classes from "./Privacy.module.css";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer/Footer";
const PrivacyPolicyPage = () => {
  return (
    <div className={classes.privacy}>
      <NavBar></NavBar>
      <div className="container my-5 text-start">
        <div className="row">
          <div className="col-12">
            <h1>Privacy Policy</h1>
            <p>
              At weCare, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, and safeguard your data when
              you use our website and services.
            </p>
            <h4>Information We Collect</h4>
            <p>
              We may collect personal information, such as your name, contact
              details, and any other information you provide when you sign up
              for our services or communicate with us. We may also collect
              non-personal information such as browser type, operating system,
              and IP address for analytical purposes.
            </p>
            <h4>How We Use Your Information</h4>
            <p>
              The information we collect is used to provide and improve our
              services. We may use your personal information to connect you with
              suitable service providers, communicate with you regarding your
              appointments or inquiries, and send you relevant updates and
              promotions with your consent.
            </p>
            <h4>Information Sharing</h4>
            <p>
              We may share your personal information with service providers to
              facilitate the delivery of healthcare services. However, we ensure
              that these service providers are bound by strict confidentiality
              agreements and adhere to our privacy standards.
            </p>
            <h4>Data Security</h4>
            <p>
              We take reasonable precautions to protect your personal
              information from unauthorized access, disclosure, or alteration.
              We use industry-standard security measures, including encryption
              and secure socket layer (SSL) technology, to safeguard your data.
            </p>
            <h4>Third-Party Links</h4>
            <p>
              Our website may contain links to third-party websites. Please note
              that we are not responsible for the privacy practices or content
              of these websites. We encourage you to review the privacy policies
              of any third-party sites you visit.
            </p>
            <h4>Your Choices</h4>
            <p>
              You have the right to review, update, and delete your personal
              information. You may also choose to opt-out of receiving
              promotional communications from us. Please contact us if you have
              any requests or concerns regarding your personal information.
            </p>
            <h4>Changes to the Privacy Policy</h4>
            <p>
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page, and the updated policy will be
              effective immediately. We recommend reviewing this page
              periodically to stay informed about our privacy practices.
            </p>
            <p>
              By using our website and services, you agree to the terms outlined
              in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PrivacyPolicyPage;
