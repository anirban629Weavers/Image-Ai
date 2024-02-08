import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Page404 from "../pages/404";
// import NavbarWithLeftDrawer from "../components/Navbar";
import TalkWithPdf from "../pages/talkwithpdf";
import MainPage from "../pages/main";
import Protected from "../providers/Protected";
import TextToImage from "../pages/TextToImg";

export default function SiteRoutes() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<Protected />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/talk-with-pdf" element={<TalkWithPdf />} />
        <Route path="/text-to-image" element={<TextToImage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
