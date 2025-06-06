import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     axios.post("http://localhost:5000/login", {
  //       password,
  //       email,
  //     }).then((response) => {
  //       console.log(response.data);
  //       if (response.data.status === "Success") {
  //         if (response.data.role === "admin") {
  //           navigate("/dashboard");
  //         }
  //         else {
  //           navigate("/");
  //         }
  //       }
  //     }).catch((error) => {
  //       console.error("There was an error logging in!", error);
  //     });
  //   } catch (error) {
  //     alert("Error login user");
  //   }
  // };


  // Make sure this is at the top of your component file

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed from using .then() to await
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      }, { withCredentials: true }); // ✅ Send request with credentials

      console.log("login data: ", response.data);
      if (response.data.status === "Success") {
        if (response.data.role === "admin") {
          console.log("Login successful, navigating to dashboard");
          navigate("/dashboard");
        } else {
          console.log("Login successful, navigating to home");
          navigate("/");
        }
      }
    } catch (error) {
      // Moved error handling here (used to be in .catch())
      console.error("There was an error logging in!", error);
      alert("Error logging in user");
    }
  };



  // token as saved localStorage
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/login", {
  //       email,
  //       password,
  //     });

  //     console.log("login data:", response.data);

  //     if (response.data.status === "Success") {
  //       // ✅ Store token
  //       localStorage.setItem("token", response.data.token);

  //       // Navigate based on role
  //       if (response.data.role === "admin") {
  //         navigate("/dashboard");
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("There was an error logging in!", error);
  //     alert("Error logging in user");
  //   }
  // };

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logn in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            <Link
              to="/sign"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Don't have an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
