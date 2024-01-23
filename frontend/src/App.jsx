import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ContestList, ContestDetail } from "./pages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" /*element={<Layout />}*/>
          <Route index element={<ContestList />} />
          <Route path="contest-list" element={<ContestList />} />
          <Route path="contest-detail" element={<ContestDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
