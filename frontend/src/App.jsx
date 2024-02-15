import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useStore from "./store/store";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import MoviePage from "./pages/MoviePage";
import Error from "./pages/Error";
import SubscribePage from "./pages/SubscribePage";
import Search from "./pages/SearchPage";
import Footer from "./layout/Footer";
import Question from "./pages/Question";
import HomePage from "./pages/HomePage";
function Layout() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <ToastContainer
        position="top-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Navbar />
      {/* mx-auto w-10/12 max-w-4xl */}
      <main className=" mb-auto  mx-auto w-full ">
        <Outlet />
      </main>
      <Question />
      <Footer />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();
  const { initialState, userAuth } = useStore();
  const { isAuth } = initialState;
  useEffect(() => {
    if (isAuth) {
      userAuth();
    }
  }, [isAuth, pathname, userAuth]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/pro" element={<ProtectedPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/test" element={<LandingPage />} />
        </Route>
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
      <Route path="/*" element={<Error />}></Route>
    </Routes>
  );
}
export default App;
// 내일 깃에노드모듈지우자
