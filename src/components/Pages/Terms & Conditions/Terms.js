import React from "react";
import classes from "./Terms.module.css";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer/Footer";
import { Link } from "react-router-dom";

const TermsConditionsPage = () => {
  return (
    <div className={classes.terms}>
      <NavBar></NavBar>
      <div className="container my-5 text-start">
        <div className="row">
          <div className="col-12">
            <h1>Terms &amp; Conditions</h1>
            <p>
              Welcome to weCare! These terms and conditions outline the rules
              and regulations for the use of our website and services.
            </p>
            <h4>Acceptance of Terms</h4>
            <p>
              By accessing or using our website, you agree to be bound by these
              terms and conditions. If you do not agree with any part of these
              terms, please do not use our services.
            </p>
            <h4>Use of Our Services</h4>
            <p>
              Our services are intended for individuals seeking healthcare
              services and service providers offering their services. You must
              be at least 18 years old to use our services.
            </p>
            <p>
              You agree to provide accurate and up-to-date information when
              using our website and services. Any misuse or unauthorized use of
              our services is strictly prohibited.
            </p>
            <h4>Intellectual Property</h4>
            <p>
              The content, logos, and trademarks displayed on our website are
              the property of weCare and its licensors. You are not permitted to
              use, reproduce, or distribute any of our intellectual property
              without our prior written consent.
            </p>
            <h4>Limitation of Liability</h4>
            <p>
              We strive to provide accurate and reliable information, but we do
              not guarantee the completeness, accuracy, or reliability of our
              content. By using our services, you agree that we shall not be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages.
            </p>
            <h4>Indemnification</h4>
            <p>
              You agree to indemnify and hold weCare and its affiliates harmless
              from any claims, demands, liabilities, costs, or expenses arising
              out of your use of our services or violation of these terms and
              conditions.
            </p>
            <h4>Changes to Terms &amp; Conditions</h4>
            <p>
              We may update these terms and conditions from time to time without
              prior notice. It is your responsibility to review these terms
              periodically for any changes. Your continued use of our services
              after the modifications constitute acceptance of the updated
              terms.
            </p>
            <h4>Contact Us</h4>
            <p>
              If you have any questions or concerns about these terms and
              conditions, please contact us at{" "}
              <Link to="/contact">Contact</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TermsConditionsPage;
