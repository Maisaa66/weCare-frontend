import Header from "../../Layout/Header/Header";
import BetterLiving from "../../Layout/BetterLiving/BetterLiving";
import ServiceSection from "../../UI/Sections/ServiceSection/ServiceSection";
import AlbumSection from "../../UI/Sections/AlbumSection/AlbumSection";
import Footer from "../../Layout/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../../Redux Store/slices/userSlice";

function Home() {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();


  useEffect(()=>{
    if (document.cookie.includes("jwt")) {
      dispatch(getUserData(userId));
    }
  }, [dispatch, userId])
  return (
    <>
      <Header></Header>
      <div className="py-4">
        <ServiceSection />
      </div>
      <div className="py-5">
      <BetterLiving />
      </div>
      <AlbumSection />
      <Footer />
    </>
  );
}

export default Home;
