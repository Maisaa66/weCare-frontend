import Footer from "../../Layout/Footer/Footer";
import NavBar from "../../Layout/NavBar/NavBar";
import classes from "./Contact.module.css";
import { useTranslation } from "react-i18next";
const ContactPage = function () {
  const { t } = useTranslation();
  return (
    <>
      <NavBar></NavBar>
      <section className="contact my-5">
        <div className="opacity">
          <div
            className="container"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <h2
              className="text-start mb-5"
              style={{ color: "var(--mainColor)" }}
            >
              Contact Us
            </h2>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="info text-start py-5">
                  <p>
                    <i className={`fas fa-home   pe-2 ${classes.ico}`}></i>
                    {t("contactAddress")}
                  </p>
                  <p>
                    <i className="fas fa-envelope  pe-2 ${classes.ico}"></i>
                    {t("contactEmail")}
                  </p>
                  <p>
                    <i className="fas fa-phone  pe-2 ${classes.ico}"></i>
                    {t("phone")}
                  </p>
                  <p>
                    <i className="fas fa-print  pe-2 ${classes.ico}"></i>
                    {t("fax")}
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className={classes.form}>
                  <form
                    action="mailto:info@wecare.com"
                    method="GET"
                    role="form"
                    className="card p-5 text-start"
                  >
                    <div className="form-group">
                      <label for="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control input-lg"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="body">Message</label>
                      <textarea
                        id="body"
                        name="body"
                        className="form-control"
                        required
                        maxlength="1500"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        className="mybtn mybtnMainSolid mt-3"
                        type="submit"
                        value="Send"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="map-responsive container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13805.464837531425!2d31.335095921788238!3d30.11233282164062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815dcc3e4e599%3A0x6c67c22e4aa39206!2sMasr%20Al%20Jadidah%2C%20Al%20Matar%2C%20El%20Nozha%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1615335898502!5m2!1sen!2seg"
          width="100%"
          height="500"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <Footer></Footer>
    </>
  );
};
export default ContactPage;
