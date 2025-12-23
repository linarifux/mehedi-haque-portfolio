import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { register, resetAuth } from '../features/auth/authSlice';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message); // Ideally replace with a Toast notification later
    }

    if (user) {
      navigate('/admin');
    }

    return () => {
      dispatch(resetAuth());
    };
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-900" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Admin Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure access for portfolio management
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={onChange}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 transition duration-150"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
             Already have an account?{' '}
             <Link to="/login" className="font-medium text-gray-900 hover:underline">
               Log in
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;