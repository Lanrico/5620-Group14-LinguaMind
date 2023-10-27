import HomePageTemplete from "../components/homePageTemplate";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const HomePage = (props) => {
  const authContext = useContext(AuthContext)
  return (
    <HomePageTemplete user={authContext.userProfile}>

    </HomePageTemplete>
  )
}

export default HomePage;