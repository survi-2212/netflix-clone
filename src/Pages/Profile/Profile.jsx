import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { useUserAuth } from "../../Context/UserAuthContext";
import "./Profile.css";
import { useNavigate } from "react-router-dom" 



function Profile() {
  const {user , logout} = useUserAuth();
  const navigate = useNavigate();

  const handleLogout =async (e)=>{
    try {
      await logout();
      navigate("/frontpage");
    } catch (err) {
        console.log(err)
    }
  } 

  // useEffect(()=>{
  //   localStorage.removeItem("isLoggedIn", false)
  // },[user]);

 

  console.log(user)
  return (
    <div className='profile_screen'>
      <Navbar/>
      <div className="profile_body">
        <h1>Edit Profile</h1>
        <div className="profile_info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" srcset="" />

          <div className="profile_details">
            <h2>{user.email}</h2>
            <div className="profile_plans">
              <button className='profile_signout' onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile