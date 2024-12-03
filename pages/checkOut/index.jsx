import React from 'react';
import { useLocation } from 'react-router-dom';
import StyleSheet from "./check.module.css";
import images from "../../src/assets/Basket.png";
import image from "../../src/assets/Location.png";
import { useNavigate } from 'react-router-dom';
import male from "../../src/assets/Male User.png";
import { useState,useEffect } from 'react';
import { getImage } from '../services';
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';



const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();

 



  const cart = location.state?.cart || []; 
  const userName = location.state?.userName || [];
  const address = location.state?.location ||'address not addded';
  const itemsTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace("₹", ""), 10); 
    console.log(`Adding item price: ${price}, Current Total: ${total}`);
    return total + price;
  }, 0);
  
  const salesTax =  10;
  const subtotal = itemsTotal + salesTax;
  const [imager, setImager] = useState([]);
  useEffect(()=>{
    const fetchImage = async () => {
      try {
        const imageId = ['674822ee5f6b959eb49161b2','6748a0863026eb4234fcc34b','6748b0df3026eb4234fcc3c6','6748b1613026eb4234fcc3ca','6748b1873026eb4234fcc3cc','674960b218d6456bac6bae06','6749607918d6456bac6bae04','674960d218d6456bac6bae08','674960e718d6456bac6bae0a','6749611f18d6456bac6bae0c','6749614818d6456bac6bae0e','67497c2a18d6456bac6bb277','67497c6318d6456bac6bb279','67497c8618d6456bac6bb27b','67497cad18d6456bac6bb27d','67497ccd18d6456bac6bb27f','6749829b18d6456bac6bb573','6749877e18d6456bac6bb5aa','6749874718d6456bac6bb5a8']; 
        const fetchedImages = await Promise.all(
          imageId.map(id => getImage(id))
      );

        setImager(fetchedImages); 
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  },[])
  const randomImages = [
    imager[0],
    imager[11],
    imager[12],
    imager[13],
    imager[14],
    imager[15],
    
];
  return (
    <div className={StyleSheet.container}>
      <div className={StyleSheet.header}>
        <h4 className={StyleSheet.promo}>Get 60% off on your first order, Promo: Orders</h4>
        {address && <p className={StyleSheet.address}><img src={image} /> {address}</p>}
        
       
        <p className={StyleSheet.cart}>
          <img src={images} className={StyleSheet.img} alt="Cart" />
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

      <div className={StyleSheet.checkout}>
       
        <h2 className={StyleSheet.details}>&larr; Your order Details</h2>
        <div className={StyleSheet.checkoutaddress}>
          <div className={StyleSheet.cartitem}>
        {cart.length > 0 ? ( 
          cart.map((item, index) => (
            <div key={index} className={StyleSheet.cartItem}>
              <h4>{item.title}</h4>
          
              <p>Price: ₹{item.price}</p>
            </div>
          
          ))
  
        ) : (
          <p>Your cart is empty</p>

        )}
          <div>
            <input type='tex' placeholder='Add a note' className={StyleSheet.note}/>
          </div>
        </div>
   
           <div className={StyleSheet.addressfield}>
       
              <button className={StyleSheet.addresshere}>
              <img src={image} className={StyleSheet.imagess}/>

            <h5 className={StyleSheet.added} onClick={()=>navigate('/address',{state:{address,userName}})}>Delivery address</h5>
            {address && <p className={StyleSheet.addresss}>{address}</p>}
              </button>
              <div className={StyleSheet.summary}>
            <h5>Items Total: ₹{itemsTotal}</h5>
            <h5>Sales Tax: ₹{salesTax}</h5>
            <h5>Subtotal: ₹{subtotal}</h5>
          </div><br/>
          <button className={StyleSheet.Payment} onClick={()=>navigate('/payment',{state:{address,cart}})}>Choose Payment Method</button>
         

      
        </div> 
        </div>

      </div>
      
      
   

      <div className={StyleSheet.menu}>
        <h4>Similar Restaurants</h4>
                <div className={StyleSheet.restaurants}>
                 
                    {randomImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            onClick={() => navigate('/product', { state: { location, userName } })} 
                            className={StyleSheet.mcdonals} 
                            alt={`Restaurant ${index + 1}`} 
                        />
                    ))}
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
                <p>Privacy Policy</p>
                <p>Terms</p>
                <p>Pricing</p>
                <p>Do not Sell or Share my personal Information</p>

            </div>
            </div>


        </div>
  );
};

export default Check;
