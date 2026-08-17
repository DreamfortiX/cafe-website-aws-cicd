import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import HomePage from "screens/homepage";
import MenuPage from "screens/menupage";
import LocationPage from "screens/locationpage";
import FoodPage from "screens/FoodGallery/Food";
import LoginPage from "screens/loginPage";
import ProfilePage from "screens/profilepage";
import FoodGalleryPage from "screens/FoodGallery";
import CancelPage from "./screens/cancelPaymentPage";
import CompletePaymentPage from "screens/completePayment";

function App() {
  const mode = useSelector((state) => state.mode);
  console.log(mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/location" element={<LocationPage/>} />
          <Route path="/food-gallery/:food" element={<FoodPage/>} />
          <Route path="/food-gallery" element={<FoodGalleryPage/>} />
          <Route path="/profile/:user" element={<ProfilePage/>} />
          <Route path="/cancel-order" element={<CancelPage/>} />
          <Route path="/complete-order" element={<CompletePaymentPage/>} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
