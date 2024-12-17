import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const OAuth = () => {
  const auth = getAuth(app); // Firebase Auth instance
  const dispatch = useDispatch(); // Correct usage of useDispatch
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Perform Google Sign-In
      const resultsFrom = await signInWithPopup(auth, provider);

      // Send data to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFrom.user.displayName,
          email: resultsFrom.user.email,
          googlePhotoUrl: resultsFrom.user.photoURL,
        }),
      });

      const data = await res.json();

      // Handle backend response
      if (!res.ok) {
        throw new Error(data.message || "Google Sign-In failed");
      }

      // Dispatch success action and navigate
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // Handle errors
      console.error("Error during Google Sign-In:", error.message);
      alert(error.message || "An error occurred during Google Sign-In");
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};
