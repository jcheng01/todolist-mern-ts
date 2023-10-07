import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState, ChangeEvent, FormEvent } from "react";

const Signup = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevents the page from refreshing, browser issue
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datajson = await res.json();
      console.log(datajson);

      if (datajson.success === false) {
        setError(datajson.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(data);
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading ..." : "Sign Up"}
        </Button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span>Sign in</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
