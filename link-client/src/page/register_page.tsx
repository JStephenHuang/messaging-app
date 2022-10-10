import { useRef, useState } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      console.log(`Username: ${username}, Password: ${password}`);
      authContext
        .register(username, password)
        .then(() => {
          // redirect main page
          navigate("/login");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 409") {
            // change ui to let user know
            console.log("username taken");
            setError(true);
          } else {
            console.log("don't know");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="text-center">
      <div className="bg">
        <h1 className="text-[30px] mb-5">
          asian<span className="text-amber-300">convo</span>
        </h1>
        <div className="flex flex-col items-center bg-[#2f2f34] rounded-2xl shadow-lg py-[2rem] px-[1.5rem]">
          <h1 className="p-10 flex flex-col">
            <p className="text-[28px] mb-3">Register</p>
            <p className="text-[12px]">
              and start texting your asian{" "}
              <span className="text-amber-300">friend</span>.
            </p>
          </h1>
          {error ? (
            <h1 className="text-red-500 text-[12px] mb-10">Username Taken</h1>
          ) : null}
          <form
            action=""
            className="flex flex-col text-[16px]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="auth-input"
              placeholder="Username"
              ref={usernameRef}
            />
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-amber-400 w-full text-amber-50 rounded-lg py-1 px-3"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-[12px] flex p-10">
            Already have an account?
            <p className="text-amber-300 ml-1">
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
