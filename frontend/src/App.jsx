import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ContestList, ContestDetail } from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Root from "./components/Layout/Root";
function App() {
  return (
    <GoogleOAuthProvider
      clientId={
        "436307408633-hnr8ld1jgqgmbcohbt068jc4hq34bcvb.apps.googleusercontent.com"
      }
    >
      <Router>
        <Root>
          <Routes>
            <Route path="/">
              <Route index element={<ContestList />} />
              <Route path="contest-list" element={<ContestList />} />
              <Route path="contest-detail" element={<ContestDetail />} />
            </Route>
          </Routes>
        </Root>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
