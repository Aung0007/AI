import React , {useState, useContext}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    function submitHandler(e) {
        e.preventDefault();
        axios.post('/users/register', {
            email: email,
            password: password,
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4"
        onSubmit={submitHandler}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
                onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
                onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
