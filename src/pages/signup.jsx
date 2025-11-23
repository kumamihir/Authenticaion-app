import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('name, email and password are required');
        }

        try {
            const url = "http://localhost:4000/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } 
            else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } 
            else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            localStorage.setItem("loggedInUser", user.displayName);
            localStorage.setItem("token", user.accessToken);

            handleSuccess("Signup Successful");
            navigate("/home");

        } catch (err) {
            handleError("Google Signup Failed");
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>

            <button type="button" className="google-btn" onClick={handleGoogleSignup}>
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="google" />
                Signup with Google
            </button>

            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>

                <button type='submit'>Signup</button>

                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>

            <ToastContainer />
        </div>
    );
}

export default Signup;
