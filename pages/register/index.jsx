import React from 'react'
import { useState } from 'react';
import { register } from '../services';
import toast from 'react-hot-toast';
const Registers = () => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: null,
    password: null,
    name:null
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = false;
  
    setFormError({ email: null, password: null, name: null });
  
    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError((formError) => ({
        ...formError,
        email: 'Invalid Email',
      }));
      errors = true;
    }
  
    if (!formData.name) {
      setFormError((formError) => ({
        ...formError,
        name: 'Name is required',
      }));
      errors = true;
    }
  
    if (!formData.password) {
      setFormError((formError) => ({
        ...formError,
        password: 'Password is required',
      }));
      errors = true;
    }
  
    if (errors) return;
  
    try {
      setLoading(true);
      const response = await register(formData);
      console.log('Response from register:', response); // Debug response
      if (response.message) {
        toast.success(response.message);
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.message || 'Error signing up');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
         <form className={StyleSheet.form} onSubmit={handleSubmit}>
       
       <input value={formData.email} type='text' placeholder='Email' onChange={(e)=>setFormData({...formData,email:e.target.value})} />
       {formError.email && <p className={StyleSheet.error}>{formError.email}</p>}
       <input value={formData.name} type='text' placeholder='Name' onChange={(e)=>setFormData({...formData,name:e.target.value})} />
       {formError.name && <p className={StyleSheet.error}>{formError.name}</p>}
       <input value={formData.password} type='password' placeholder='password' onChange={(e)=>setFormData({...formData,password:e.target.value})} />
       {formError.password && <p className={StyleSheet.error}>{formError.password}</p>}
       <div>
       <input type='checkbox' name='tos'/>
       <label htmlFor='text'>I agree to terms and Conditions</label>
       </div>
       <button disabled={loading} type='submit'>{loading ? "loading.." :"Sign Up"}</button>
       </form>
    </div>
  )
}

export default Registers;
