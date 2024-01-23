import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { List, Detail } from "./pages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" /*element={<Layout />}*/>
          <Route index element={<List />} />
          <Route path="contest-list" element={<List />} />
          <Route path="contest-detail" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
