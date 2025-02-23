import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {  // Make function async
    e.preventDefault();
    
    if (!user.username || !user.email || !user.password) {
      alert("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert("Invalid email format!");
      return;
    }

    console.log("User Registered:", user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", { // Add await
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        alert("Registration successful!");
        setUser({ username: "", email: "", password: "" });
        navigate("/login"); // Navigate only if registration is successful
      } else {
        alert(data.message || "Registration failed!"); // Show error message from backend
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <main className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg grid md:grid-cols-2 gap-6">
        <div className="hidden md:flex justify-center items-center">
          <img
            src="/images/register.png"
            alt="A nurse with a cute look"
            className="w-80 h-auto"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Registration Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register Now
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Signup;
