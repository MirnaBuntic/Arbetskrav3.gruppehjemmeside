import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import PersonalPage from "./components/personalPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile/:slug" element={<PersonalPage/>} />
      
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
