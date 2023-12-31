import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [data, setData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents the page from refreshing, browser issue
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datajson = await res.json();
      console.log(datajson);

      if (datajson.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(data);
  return (
    <div className="signup">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <Button className="btn" disabled={loading}>
          {loading ? "Loading ..." : "Sign In"}
        </Button>
        <OAuth />
      </form>
      <div className="">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span>Sign Up</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signin;
