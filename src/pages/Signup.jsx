import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true); // Fixed spelling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);

      if (rememberLogin) {
        // You can save the user session or token in localStorage here
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("userEmail", email);
      } else {
        // If remember me is not checked, clear previous login info
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userEmail");
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg"
          alt="background"
        />
        <div className="bg-black/10 fixed top-0 left-0 w-full h-screen" />
        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold text-white">Sign Up</h1>
              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded text-white"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="p-3 my-2 bg-gray-700 rounded text-white"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold text-white">
                  Sign Up
                </button>

                <div className="flex justify-between items-center text-gray-600">
                  <p>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={rememberLogin}
                      onChange={(e) => setRememberLogin(e.target.checked)} // Fixed the handler
                    />{" "}
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-4 text-gray-400">
                  <span className="mr-2">Already subscribed to Netflix?</span>
                  <Link to="/login" className="text-white">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
