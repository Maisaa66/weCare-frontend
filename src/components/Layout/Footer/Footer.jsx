import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className={`text-center text-lg-start ${classes.footer}`}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span className="text-dark">{t("footerConnect")}</span>
          </div>
          <div className={`${classes.connected}`}>
            <a href="" className="me-4 link-light">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-4 mx-auto mb-4 d-flex flex-column align-items-center text-center">
                <h6 className="text-uppercase fw-bold mb-4">
                  <div className={`${classes.logo}`}>
                    <img className="w-100" src="./Images/logo.png" alt="Logo" />
                  </div>
                  {/* {t("slogan")} */}
                </h6>
                <p className="text-dark">{t("footerSlogan")}</p>
              </div>

              <div className="offset-md-1 col-md-3  mx-auto mb-4">
                <h6 className="text-uppercase fw-bold ">{t("footerUsefulLinks")}</h6>
                <p>
                  <Link to="/about" className=" link-dark">
                    {t("about")}
                  </Link>
                </p>
                <p>
                  <Link to="contact" className=" link-dark">
                  {t("contact")}
                  </Link>
                </p>
                <p>
                  <Link to="/terms" className=" link-dark">
                  {t("terms")}
                  </Link>
                </p>
                <p>
                  <Link to="/privacy" className="link-dark">
                  {t("policy")}
                  </Link>
                </p>
              </div>

              <div className="offset-md-1 col-md-3 mx-auto mb-md-0 mb-4 text-dark">
                <h6 className="text-uppercase fw-bold mb-4">{t("contactInfo")}</h6>
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
          </div>
        </section>
        <div className={`text-center p-4 ${classes.copyRight}`}>
          © 2023 {t("copyright")}
          <a className="text-reset fw-bold" href="/">
            {t("slogan")}
          </a>
        </div>
      </footer>
    </>
  );
};
export default Footer;
