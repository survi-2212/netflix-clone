import React, { useState } from "react";
import "./SignIn.css";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";


function SignIn() {
  const navigate = useNavigate();
  const [hasAccount, sethasAccount] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { signup, signin ,signInwithGoogle } = useUserAuth();
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    seterrorMessage("");
    try {
      await signup(email, password);
      setsuccessMessage("Signed up Successfully");
      sethasAccount(true);
      setemail("");
      setpassword("");
      setOpen(true);
    } catch (error) {
      console.log(error.message)
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        seterrorMessage("Email already in use");
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        seterrorMessage("Enter valid email");
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        seterrorMessage("Password should be at least 6 characters ");
      }
      if (error.message === "Firebase: Error (auth/internal-error).") {
        seterrorMessage("Fill all the fields");
      }
      setOpen(true);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setsuccessMessage("");
    // seterror("");
    try {
      await signin(email, password);
      setsuccessMessage("Logged in Successful");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        seterrorMessage("User not found");
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        seterrorMessage("Enter valid email");
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        seterrorMessage("Wrong Password");
      }
      if (error.message === "Firebase: Error (auth/internal-error).") {
        seterrorMessage("Fill all the fields");
      }
      setOpen(true);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleGoogleSignIn =async (e)=>{
    e.preventDefault();
    setsuccessMessage("");

    try {
      await signInwithGoogle();
      setsuccessMessage("Logged in Successful");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      seterrorMessage("Something wrong !!")
    }
    


  }

  return (
    <div className="signIn_screen">
      <form>
        
        {hasAccount ? <h1>Sign In</h1> : <h1>Sign up</h1>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          required
        />

        {hasAccount ? (
          <>
            <button type="submit" onClick={handleSignIn}>
              Sign In
            </button>

            <h4>
              <span className="color_grey">New to Netflix ? </span>
              <span
                className="signup_link"
                onClick={() => sethasAccount(!hasAccount)}
              >
                Sign Up here
              </span>
            </h4>
          </>
        ) : (
          <>
            <button type="submit" onClick={handleSignUp}>
              Sign Up
            </button>
            <h4>
              <span className="color_grey">Have an account ? </span>
              <span
                className="signup_link"
                onClick={() => sethasAccount(!hasAccount)}
              >
                Sign In here
              </span>
            </h4>
          </>
        )}
          <hr style={{marginTop:"10px", marginBottom: '6px'}}/>
        {errorMessage && (
            <>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleClose}
              >
                <Alert
                  sx={{ width: "100%" }}
                  severity="error"
                  onClose={handleClose}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </>
          )}
          {successMessage && (
            <>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleClose}
              >
                <Alert
                  sx={{ width: "100%" }}
                  severity="success"
                  onClose={handleClose}
                >
                  {successMessage}
                </Alert>
              </Snackbar>
            </>
          )}
          {hasAccount ? <>
          <div className="google-button">
            <GoogleButton style={{width: '100%'}} onClick={handleGoogleSignIn}/>
          </div>
          </> : ""}
      </form>
    </div>
  );
}

export default SignIn;
