import React, { useState } from "react";
import "./FrontPage.css";
import SignIn from "../SignIn/SignIn";

function FrontPage() {

  const [signIn, setsignIn] = useState(false);



  return (
    <div className="LoginScreen">
      <div className="LoginScreenBackground">
        <img
          className="LoginLogo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        <button className="Login_button" onClick={() =>{setsignIn(true)}}>Sign In</button>
        <div className="login_gradient"></div>
      </div>

      <div className="login_body">
      {signIn ? (
        <SignIn/>
      ) : (
        <>
          <h1>Unlimited films, TV programms and more</h1>
          <h2>Watch anywhere. Cancle at any time</h2>
          <h3>Ready to watch ? Enter your email address</h3>
          <div className="login_input">
            <form>
              <input type="email" placeholder="Enter Email" />
              <button className="login_button_started" onClick={() => setsignIn(true)}>
                GET STARTED
              </button>
            </form>
          </div>
        </>
      )}
        
      </div>
    </div>
  );
}

export default FrontPage;
