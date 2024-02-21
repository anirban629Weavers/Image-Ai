import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Page404 from "../pages/404";
import TalkWithPdf from "../pages/talkwithpdf";
import MainPage from "../pages/main";
import Protected from "../providers/Protected";
import TextToImage from "../pages/TextToImg";
import ModifyImage from "../pages/imagemodifier";
import SentimentAnalysis from "../pages/Sentiment";
import ModeratorReview from "../pages/Review";

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
        <Route path="/modify-image" element={<ModifyImage />} />
        <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
        <Route path="/moderator-review" element={<ModeratorReview />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
