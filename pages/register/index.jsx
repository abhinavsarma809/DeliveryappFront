import React, { useState } from 'react';
import { register } from '../services';  // Assuming you have a register service function
import toast from 'react-hot-toast';
import StyleSheet from "./register.module.css";
import { useNavigate } from 'react-router-dom';
import images from "../../src/assets/hand.jpeg";  // Image for styling or branding

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formError, setFormError] = useState({
    name: null,
    email: null,
    password: null,
    gender:null,
    country:null,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender:'',
    country:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = false;

    setFormError({
      name: null,
      email: null,
      password: null,
    });

    // Validation
    if (!formData.name || formData.name.length < 1) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        name: 'Name is required',
      }));
      errors = true;
    }

    if (!formData.email || formData.email.length < 1 || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        email: 'Invalid Email',
      }));
      errors = true;
    }
    if (!formData.gender) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        gender: 'gender is required',
      }));
      errors = true;
    }
    if (!formData.country) {
      setFormError((prevFormError) => ({
        ...prevFormError,
      country: 'country is required',
      }));
      errors = true;
    }


    if (!formData.password) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        password: 'Password is required',
      }));
      errors = true;
    }

    if (errors) {
      return;
    }

    try {
      setLoading(true);
      const response = await register(formData); // Call to your register service
      toast.success(response.message);
      if (response.token) {
        // Save token and user details in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userName', response.name); // Store the name in localStorage
        navigate('/', { state: { userName: response.name } });  // Redirect to Home
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error('Error registering user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={StyleSheet.pagecontainer}>
      <div className={StyleSheet.container}>
        <h1 className={StyleSheet.h1}>Order<h6 className={StyleSheet.rotate}>.UK</h6></h1>
        <h2 className={StyleSheet.h2}>Join Us <img src={images} alt="Description" className={StyleSheet.hand} /> </h2>
        <p className={StyleSheet.data}>Welcome! Create your account to start ordering.</p>

        <form onSubmit={handleSubmit} className={StyleSheet.form}>
          <div className={StyleSheet.inputName}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name"
              className={StyleSheet.name}
            />
          </div>
          {formError.name && <p style={{ color: 'red' }} className={StyleSheet.errors}>{formError.name}</p>}

          <div className={StyleSheet.inputEmail}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className={StyleSheet.email}
            />
          </div>
          {formError.email && <p style={{ color: 'red' }} className={StyleSheet.errors}>{formError.email}</p>}

          <div className={StyleSheet.inputPassword}>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className={StyleSheet.password}
            />
          </div>
          {formError.password && <p style={{ color: 'red' }} className={StyleSheet.errors}>{formError.password}</p>}
          <div className={StyleSheet.gender}>
            <input
              type="search"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              placeholder="Gender"
              className={StyleSheet.sex}
            />
          </div>
          {formError.gender && <p style={{ color: 'red' }} className={StyleSheet.gendererrors}>{formError.gender}</p>}
          <div>
          <input
              type="search"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Country"
              className={StyleSheet.country}
            />
          </div>
          {formError.country && <p style={{ color: 'red' }} className={StyleSheet.countryerrors}>{formError.country}</p>}
          <button disabled={loading} type="submit" className={StyleSheet.button}>
            {loading ? 'Loading... ' : 'Sign Up'}
          </button>
          
          <p className={StyleSheet.log}>
            Already have an account? 
            <span className={StyleSheet.login} onClick={() => navigate('/login')}>Login</span>
          </p>
        </form>
      </div>
      <div className={StyleSheet.footer}>
        <h1 className={StyleSheet.order}>Order</h1>
        <h2 className={StyleSheet.navu}>kU.</h2>
        <h3 className={StyleSheet.deals}>Get Exclusive Deals in Your Inbox</h3>
        <input type="email" className={StyleSheet.sub} placeholder="Your email@gmail.com" />
        <button className={StyleSheet.submit}>Subscribe</button>
      </div>
    </div>
  );
};

export default Register;
