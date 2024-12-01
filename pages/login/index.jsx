import React, { useState, useEffect } from 'react';
import { login, getImage } from '../services';
import toast from 'react-hot-toast';
import StyleSheet from './login.module.css';
import { useNavigate } from 'react-router-dom';
import images from '../../src/assets/hand.jpeg';
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    email: null,
    password: null,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageId = '673f67bf21134ed2d98c7c11'; 
        const url = await getImage(imageId);
        setImage(url); 
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = false;

    setFormError({
      email: null,
      password: null,
    });

    if (!formData.email || formData.email.length < 1 || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        email: 'Invalid Email',
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
      const response = await login(formData);
      toast.success(response.message);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userName', response.name); 
        localStorage.setItem('email', response.email);
        localStorage.setItem('gender', response.gender);
        localStorage.setItem('country', response.country);
        navigate('/', { state: { userName: response.name, email: response.email, gender: response.gender, country: response.country } }); 
      }
    } catch (error) {
      console.error('Error during login:', error); 
      toast.error('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={StyleSheet.pagecontainer}>
      <div className={StyleSheet.container}>
        <h1 className={StyleSheet.h1}>Order<h6 className={StyleSheet.rotate}>.UK</h6></h1>
        <h2 className={StyleSheet.h2}>
          Welcome Back <img src={images} alt="Description" className={StyleSheet.hand} />
        </h2>
        <p className={StyleSheet.data}>
          Today is a new day. It's your day. You shape it
          <p className={StyleSheet.pro}>Sign in to start ordering.</p>
        </p>
        <form onSubmit={handleSubmit} className={StyleSheet.form}>
          <div className={StyleSheet.inputemail}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email"
              className={StyleSheet.email}
            />
          </div>
          {formError.email && <p style={{ color: 'red' }} className={StyleSheet.errors}>{formError.email}</p>}

          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="password"
            className={StyleSheet.password}
          />
          {formError.password && <p style={{ color: 'red' }} className={StyleSheet.error}>{formError.password}</p>}

          <button disabled={loading} type="submit" className={StyleSheet.button}>
            {loading ? 'Loading... ' : 'Sign In'}
          </button>
          <p className={StyleSheet.log}>
            Don't you have an account?
            <p className={StyleSheet.signup} onClick={() => navigate('/register')}>Sign up</p>
          </p>
        </form>
        <div className={StyleSheet.imagecontainer}>
          {image && (
            <img src={image} alt="burger" className={StyleSheet.image} />
          )}
        </div>
      </div>
      <div className={StyleSheet.footer}>
        <h1 className={StyleSheet.order}>Order</h1>
        <h2 className={StyleSheet.navu}>kU.</h2>
        <h3 className={StyleSheet.deals}>Get Exclusive Deals in Your Inbox</h3>
        <h3 className={StyleSheet.legal}>Legal Pages</h3>
        <h3 className={StyleSheet.legal}>Important Links</h3>
        <img src={brand} className={StyleSheet.apple} />
        <img src={group} className={StyleSheet.apples} />
        <input type='search' className={StyleSheet.sub} placeholder='Your email@gmail.com' />
        <button className={StyleSheet.submit}>Subscribe</button>
        <div className={StyleSheet.pages}>
          <a href='/' className={StyleSheet.Terms}>Terms and Conditions</a>
          <a href='/' className={StyleSheet.privacy}>Privacy</a>
          <a href='/' className={StyleSheet.refund}>Refund</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
