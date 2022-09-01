import "./App.css";
import Home from "./Pages/Home";
import {  Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage/FrontPage";
import {UserContextProvider} from "./Context/UserAuthContext"
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
// import { ToastContainer } from "react-toastify"


function App() {
  // const user = null;
  return (
    <div className="App">
    
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/frontpage" element={<FrontPage/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/> </ProtectedRoute>}/>
      </Routes>
      </UserContextProvider>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default App;
