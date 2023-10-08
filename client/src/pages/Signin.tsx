import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  username?: string;
  email?: string;
  password?: string;
};

const Signin = () => {
  const [data, setData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null);
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
        setError(datajson.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
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
      </form>
      <div>
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
