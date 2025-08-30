import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

import SignIn from "./pages/signin/SignInPage";
import Register from "./pages/register/RegisterPage";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import CardDesign from "./pages/CardDesign";
import CreateCard1 from "./pages/createCard/CreateCard1";
import CreateCard2 from "./pages/createCard/CreateCard2";
import CreateCard3 from "./pages/createCard/CreateCard3";
import CreateCard4 from "./pages/createCard/CreateCard4";
import CreateCard5 from "./pages/createCard/CreateCard5";
import CreateCard6 from "./pages/createCard/CreateCard6";
import CreateCard7 from "./pages/createCard/CreateCard7";
import ViewEntry from "./pages/showCard/ShowCard1";

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cardDesign" element={<CardDesign />} />
            <Route path="/card1" element={<CreateCard1 />} />
            <Route path="/card2" element={<CreateCard2 />} />
            <Route path="/card3" element={<CreateCard3 />} />
            <Route path="/card4" element={<CreateCard4 />} />
            <Route path="/card5" element={<CreateCard5 />} />
            <Route path="/card6" element={<CreateCard6 />} />
            <Route path="/card7" element={<CreateCard7 />} />
            <Route path="/view/:id" element={<ViewEntry />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
