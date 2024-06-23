import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Route,
  createBrowserRouter as Router,
  RouterProvider,
  createRoutesFromElements as RoutesElements,
} from "react-router-dom";
import Root from "./components/Layout/Root";
import { ContestDetail, ContestList, FindTeam, PartnerList, TeamDetail, TeamDetailMember, UserCenter } from "./pages";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // Use React Router v6 syntax
  const router = Router(
    RoutesElements(
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Root />}>
          <Route index element={<ContestList />} />
          <Route path="contest-list" element={<ContestList />} />
          <Route path="contest-detail/:id" element={<ContestDetail />} />
          <Route path="partner-list" element={<PartnerList />} />
          <Route path="user-center" element={<UserCenter />} />
          <Route path="team" element={<FindTeam />} />
          <Route path="team-detail/:id" element={<TeamDetail/>} />
          <Route path="team-detail-member" element={<TeamDetailMember />} />
        </Route>
      </Route>
    )
  );

  return (
    <GoogleOAuthProvider
      clientId={
        "436307408633-hnr8ld1jgqgmbcohbt068jc4hq34bcvb.apps.googleusercontent.com"
      }
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
