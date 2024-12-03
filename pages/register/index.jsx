import React, { useState,useEffect } from 'react';
import { register } from '../services';  // Assuming you have a register service function
import toast from 'react-hot-toast';
import StyleSheet from "./register.module.css";
import { getImage} from '../services';
import { useNavigate } from 'react-router-dom';
import images from "../../src/assets/hand.jpeg";  
import Footer from '../footer';
import reviews from "../../src/assets/reviews.jpeg";
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  
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
        <div className={StyleSheet.colmun}>
        <div className={StyleSheet.menuorders}>
                    
                    <h1 className={StyleSheet.order}>Order</h1>
                    <h1 className={StyleSheet.uk}>uk.</h1>
               
                    </div>
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
          {formError.email && <p style={{ color: 'red' }} className={StyleSheet.emailerrors}>{formError.email}</p>}

          <div className={StyleSheet.inputPassword}>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className={StyleSheet.password}
            />
          </div>
          {formError.password && <p style={{ color: 'red' }} className={StyleSheet.passworderrors}>{formError.password}</p>}
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
        <div className={StyleSheet.imagecontainer}>
          {image && (
            <img src={image} alt="burger" className={StyleSheet.image} />
          )}
        </div>
       
      </div>
      <div className={StyleSheet.footerContainer}>
            <div className={StyleSheet.footer}>
                <div className={StyleSheet.upperPart}>
                    <div className={StyleSheet.Uks}>
                    <h1 className={StyleSheet.h2}>Order</h1>
                    <p className={StyleSheet.Uk}>UK.</p>
                    </div>
                    <p className={StyleSheet.get}>Get Exclusive Deals in your Inbox</p>
                    <p className={StyleSheet.get}>Legal Pages</p>
                    <p className={StyleSheet.get}>Important Links</p>
                    

                </div>
              <div className={StyleSheet.middlePart}>
                    <div className={StyleSheet.brands}>
                    <img src={brand} className={StyleSheet.apple} />
                    <img src={group} className={StyleSheet.apples} />

                    </div>
         <div className={StyleSheet.social}>
         <input type='search' className={StyleSheet.sub} placeholder='Your email@gmail.com' />
         <button className={StyleSheet.submit}>Subscribe</button>

         </div>
         <div className={StyleSheet.pages}>
          <a href='/' className={StyleSheet.Terms}>Terms and Conditions</a>
          <a href='/' className={StyleSheet.privacy}>Privacy</a>
          <a href='/' className={StyleSheet.refund}>Cookies</a>
          <a href='/' className={StyleSheet.refunds}>Modern Slavery Statement</a>
        </div>
                
       <div className={StyleSheet.pages}>
          <a href='/' className={StyleSheet.Terms1}>Get help</a>
          <a href='/' className={StyleSheet.privacy2}>Add your restaurant</a>
          <a href='/' className={StyleSheet.refund3}>Sign up to deliver</a>
          <a href='/' className={StyleSheet.refunds3}>Create a Business account</a>
        </div>
       
                    
           
     
                    

                </div>
                <div className={StyleSheet.LastRow}>
                    <p>Company # 490039-445, Registered with House of companies.</p>
                    <div className={StyleSheet.socialMedia}>
                    <a href='/'><img src={insta}/></a>
                    <a href='/'><img src={face}/></a>
                    <a href='/'><img src={snap}/></a>
                    <a href='/'><img src={twitter}/></a>
                    </div>
                    
                </div>


            </div>
            <div className={StyleSheet.copyright}>
                <p>Order.uk Copyright 2024, All Rights Reserved.</p>
                <p className={StyleSheet.policy}>Privacy Policy</p>
                <p className={StyleSheet.policy}>Terms</p>
                <p className={StyleSheet.policy}>Pricing</p>
                <p className={StyleSheet.policy}>Do not Sell or Share my personal Information</p>

            </div>
            </div>


      
   
    </div>
  );
};

export default Register;
