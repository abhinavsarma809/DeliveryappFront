
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';

import green from '../../src/assets/green.png'
import StyleSheet from './payment.module.css'
import images from "../../src/assets/Location.png";
import male from "../../src/assets/Male User.png";
import { useNavigate } from 'react-router-dom';
const Payment = () => {
  const navigate = useNavigate();
  const [userName,setUserName] = useState(null)
  const [confuse,setConfuse] = useState(false)
  const [state,setState] = useState(false) ;
  const [lower,setLower] = useState(false)
    
  const location = useLocation();
  const address = location.state?.address||[];
  const cart = location.state?.cart || []; 
  useEffect(()=>{
    const storedName = localStorage.getItem('userName');

    if (storedName) {
        setUserName(storedName); 
    }
  },[])
  const itemsTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace("₹", ""), 10); 
    console.log(`Adding item price: ${price}, Current Total: ${total}`);
    return total + price;
  }, 0);
  
  const salesTax =  10;
  const subtotal = itemsTotal + salesTax;
  const toggle =()=>{
    setConfuse((prevstate)=>(!prevstate))
  }
  const handler=()=>{
    setState(true)
    setLower(true)

  }

  return (
    <div className={StyleSheet.container}>
       <div className={StyleSheet.header}>
        <h4 className={StyleSheet.promo}>Get 60% off on your first order, Promo: Orders</h4>
        {address && <p className={StyleSheet.add}> Address: {address}</p>}

       
        <p className={StyleSheet.cart}>
          
          <img src={images} className={StyleSheet.img} alt="Cart"  onClick={toggle}/>
          My Cart
        </p>
       
      </div>

      <div className={StyleSheet.mainbar}>
                <div className={StyleSheet.menuorders}>
                <h1 className={StyleSheet.order}>Order</h1>
                <h1 className={StyleSheet.uk}>uk.</h1>
           
                </div>
                
                <h4 className={StyleSheet.class}>Home</h4>
                <h4 className={StyleSheet.class1}>Browser Menu</h4>
                <p className={StyleSheet.class1}>specials offers</p>
                <p className={StyleSheet.class1}>Restaurants</p>
                <p className={StyleSheet.class1}>Track Order</p>
                {userName && <p className={StyleSheet.user} onClick={()=>navigate('/details')}><img src={male}/>Hello, {userName}</p>} 
        
      </div>
      <div className={StyleSheet.checkout} >
         {confuse ? (
          
  cart.length > 0 ? (
    cart.map((item, index) => (
      <div key={index} className={StyleSheet.cartItem}>
        <p>My basket</p>
        <h4>{item.title}</h4>
        <p>Price: ₹{item.price}</p>
      </div>
    ))
  ) : (
    <p>Your cart is empty</p>
  )
) : null}

</div>

      {   !state &&(<div className={StyleSheet.payment}>
        
       
            <h2 className={StyleSheet.details}>&larr; Choose and Pay</h2>
            <div className={StyleSheet.Wallet}>
              <div className={StyleSheet.Wallets}>
              
                  <h2 className={StyleSheet.lineItem}>Wallet</h2>

                    <p className={StyleSheet.lineItem}>MasterCard</p>
                    <p className={StyleSheet.lineItem}>PayPal</p>
                    <p className={StyleSheet.lineItem}>Stripe</p>
                    <button onClick={()=>navigate('/details')} className={StyleSheet.navigate}>+ Add dedbit card</button>
 


                 

           



                </div>
                <div className={StyleSheet.amountto}> 
                  <p ><input type='text'placeholder='amout to be payed'className={StyleSheet.rod}/> ₹{subtotal}</p>
                  <button className={StyleSheet.proceedings} onClick={handler}>Proceed to payment</button>

                </div>

            </div>

          
      
   

      </div>)
}
{
  lower && (
    <>
    <div className={StyleSheet.successfull}>
    <img src={green} alt="Success Icon" className={StyleSheet.iconstar}/>
    <p className={StyleSheet.right}>Order Successful</p>
    <p>your Order is confirmed and on it is way.<br/>
    Get set to save your choose delight</p>
    <div className={StyleSheet.Secondsuccess}>
    {
  cart.length > 0 && (
    <div>
      {cart.map((item, index) => (
        <div key={index} className={StyleSheet.cartItems}>
          <p>My basket</p>
          <h4>{item.title}</h4>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
   
    </div>
  )
}
<button className={StyleSheet.home} onClick={()=>navigate('/')}>Back To Home</button>


    </div>
      
    </div>
   
    </>
  )
}

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
                <p>Privacy Policy</p>
                <p>Terms</p>
                <p>Pricing</p>
                <p>Do not Sell or Share my personal Information</p>

            </div>

            </div>
        </div>
 
  )
}

export default Payment;
