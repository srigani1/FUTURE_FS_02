import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://srigani1-mini-crm-backend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

      window.location.href = "/FUTURE_FS_02/";
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;