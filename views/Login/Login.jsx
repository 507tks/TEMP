
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/thunk/login";
import { Input, Button, Typography, Checkbox, Spinner } from "@material-tailwind/react";
import Logo from "../../assets/robodoc.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Email validation regex pattern
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const SignIn = () => {
  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);
  const [userError, setUsernameError] = useState({ bool: false, message: "" });
  const [passwordError, setPasswordError] = useState({ bool: false, message: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.LoginSlice.loginData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Reset previous error states
    setUsernameError({ bool: false, message: "" });
    setPasswordError({ bool: false, message: "" });

    // Email validation
    if (!email || !validateEmail(email)) {
      setUsernameError({
        bool: true,
        message: "Invalid email format.",
      });
    }

    // Password validation (ensure it's not empty)
    if (password === "") {
      setPasswordError({
        bool: true,
        message: "Password is required.",
      });
    }

    // Dispatch login thunk if no errors
    if (validateEmail(email) && password) {
      setLoading(true);
      dispatch(loginThunk({ email, password }));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginData?.msg === "Success") {
      toast.success("Login successful!");
      setLoading(false);
      navigate("/dashboard/home");
    } else if (loginData?.msg === "Error") {
      toast.error("Invalid email or password. Please try again.");
      setLoading(false);
    }
  }, [loginData, navigate]);

  return (
    <section className="w-full h-screen p-8 flex gap-4 bg-gradient-to-br from-blue-100 to-green-50">
      <div className="w-fit h-fit lg:w-3/5 mt-24 justify-center items-center rounded-lg p-4">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="block mb-1 font-medium">
                Your email
              </Typography>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={userError.bool}
              />
              {/* Show email error below the input */}
              {userError.bool && <Typography variant="small" color="red" className="mt-1">{userError.message}</Typography>}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="block mb-1 font-medium">
                Password
              </Typography>
              <Input
                name="password"
                type={showPasswordCheckbox ? "text" : "password"}
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={passwordError.bool}
              />
              {/* Show password error below the input */}
              {passwordError.bool && <Typography variant="small" color="red" className="mt-1">{passwordError.message}</Typography>}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                checked={showPasswordCheckbox}
                onChange={(e) => setShowPasswordCheckbox(e.target.checked)}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium"
                  >
                    Show Password
                  </Typography>
                }
                containerProps={{ className: "ml-0" }}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 bg-custom-theme text-white"
            fullWidth
            disabled={loading}
          >
            {loading ? <Spinner className="h-5 w-5" /> : "Sign In"}
          </Button>

          {/* <Typography variant="small" className="font-medium text-gray-900 mt-6 text-center">
            <NavLink to="/forget-password" className="text-blue-500 text-sm hover:underline">
              Forgot password?
            </NavLink>
          </Typography> */}

        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block justify-center items-center my-auto">
        <img
          src={Logo}
          className="h-full w-full object-cover rounded-3xl"
          alt="logo"
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignIn;
