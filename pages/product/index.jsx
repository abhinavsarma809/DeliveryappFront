import React, { useState, useEffect } from 'react';
import { getFood } from '../services';

import StyleSheet from "./product.module.css";
import images from "../../src/assets/Basket.png";
import image from "../../src/assets/Location.png"
import remove from "../../src/assets/Remove.png";
import { useNavigate, useLocation } from 'react-router-dom';
import burger from "../../src/assets/Burger.png";
import Fries from "../../src/assets/French Fries.png";
import Shakes from "../../src/assets/Shakes.png";
import Locationss from "../../src/assets/Location.png";

import id from "../../src/assets/Icon.png";
import reviews from "../../src/assets/reviews.png";
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';

import menur from '../../src/assets/Menu.png';




const Product = () => {
    const navigate = useNavigate(); 
    const locationData = useLocation(); 
    const [imager, setImager] = useState([]);
    const { location } = locationData.state || {}; 
    const [userName,setUserName] = useState()
    const [food, setFood] = useState([]);
    const [cart, setCart] = useState([]); 
 
    const [dis, setDis] = useState(false);

    const fetchFood = async () => {
        try {
            const response = await getFood();
            setFood(response);
        } catch (error) {
            console.error("Error fetching food:", error);
        }
    };

    
    useEffect(() => {
      
     
   
        
     
            const storedName = localStorage.getItem('userName');
            if (storedName) {
                setUserName(storedName); 
            }
        fetchFood();
    }, []);
 
    const foods =[ 
      
      
        
    ]
 
    const itemsTotal = cart.reduce((total, item) => {
        const price = parseInt(item.price.replace("₹", ""), 10); 
        console.log(`Adding item price: ${price}, Current Total: ${total}`);
        return total + price;
      }, 0);
      const salesTax = 10;
      const subTotal = itemsTotal+salesTax

    const handleCartRemove = (itemToRemove) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== itemToRemove._id));
    };
    
    const addToCart = (foodItem) => {
        setCart([...cart, foodItem]);
    };

    const ToggleEvent = () => {
        setDis((prevState) => !prevState);
    };
 

    return (
        <div className={StyleSheet.container}>
            <div className={StyleSheet.reverse}>
            <div className={StyleSheet.header}>
                <h4 className={StyleSheet.h4}>Get 60% off on your first order, Promo: Orders</h4>


                {location && <p className={StyleSheet.address}> <img src={image}/>{location}</p>}
               

                <p className={StyleSheet.cart} onClick={ToggleEvent}>
                    <img src={images} className={StyleSheet.img} alt="Cart" />
                    My Cart
                </p>
                {userName && <p className={StyleSheet.user1} onClick={()=>navigate('/details')}>Hello, {userName}</p>} 
                
            </div>
            <div className={StyleSheet.mainbar}>
                <div className={StyleSheet.menuorders}>
                    
                <h1 className={StyleSheet.order}>Order</h1>
                <h1 className={StyleSheet.uk}>uk.</h1>
           
                </div>
                <img  src ={menur} className={StyleSheet.menur}/>
                
                <h4 className={StyleSheet.class}>Home</h4>
                <p className={StyleSheet.class1}>specials offers</p>
                <p className={StyleSheet.class12}>Restaurants</p>
                <p className={StyleSheet.class1}>Track Order</p>
                {userName && <p className={StyleSheet.user} onClick={()=>navigate('/details')}>Hello, {userName}</p>} 
                
</div>
</div>
<div className={StyleSheet.middle}>
   
            <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733292175/restaurant/ethmduznss0ixurmvqn7.jpg' className={StyleSheet.image1} />

    

</div>
<div className={StyleSheet.All}>
    <h2 className={StyleSheet.offerAll}>All offers From McDonald's East London</h2>
    <form>
    <input type='text' className={StyleSheet.search} placeholder='search'/>
    </form>
   

</div>
<div className={StyleSheet.offers}>
    <p className={StyleSheet.offers1}>offers</p>
    <p>burgers</p>
    <p>Fries</p>
    <p>Snacks</p>
    <p className={StyleSheet.nenu}>Socials</p>
    <p className={StyleSheet.nenu}>cold drinks</p>
    <p className={StyleSheet.nenu}>Happy Meal</p>
    <p className={StyleSheet.nenu}>Desserts</p>
    <p className={StyleSheet.nenu}>Hot drinks</p>
    <p className={StyleSheet.nenu}>Soruces</p>
    <p className={StyleSheet.nenu}>orbit</p>

</div>
<div className={StyleSheet.foods}>
    
            <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733293203/restaurant/foevar60xihvjbfdh8yf.png' className={StyleSheet.foodImage}/>
            <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733293202/restaurant/yfzoff4lrzvatmv6zv6b.png'  className={StyleSheet.foodImage}/>
            <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733293202/restaurant/qfksobcvo3qgsrx6dk1x.png'className={StyleSheet.foodImage}/>
    {dis && (
        <>
        <div className={StyleSheet.overlay}>
                <div className={StyleSheet.cartDetails}>
                    
                      
                    <div className={StyleSheet.basket}>
                    <h3 >My Basket</h3>

                    </div>

                    {cart.length > 0 ? (
                        <>
                            {cart.map((item, index) => (
                                <div key={index} className={StyleSheet.cartItem}>
                                    <h4 className={StyleSheet.title}>{item.title}</h4>
                                    <p className={StyleSheet.title}>{item.description}</p>
                                    <p className={StyleSheet.title}>Price: ₹{item.price}</p> 
                                    <span className={StyleSheet.remove} onClick={() => handleCartRemove(item)}>
                                        <img src={remove} alt="Remove" />
                                    </span>
                                </div>
                               
                            ))}
                            <p>sub total:  {subTotal}</p>
                            <p>Discounts : -₹3.00 </p>
                            <p>Delivery Fee : ₹3.00</p>
                            <button onClick={()=>navigate('/payment',{state:{cart}})} className={StyleSheet.proceed}> Total Payment: {subTotal} </button>
                            <button className={StyleSheet.checkoutButton} onClick={() => navigate("/check", { state: { cart,location,userName} })}>Checkout</button>
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
                </div>
                </>
            )}

</div>

            <div className={StyleSheet.display}>
                <h2>Burgers</h2>
                <div className={StyleSheet.foodDisplay}>
                
                {food.length > 0 ? (
                    food.map((fod) => (
                        <div key={fod._id} className={StyleSheet.foodCard}>
                            <div  className={StyleSheet.mcFood}>
                            <h3>{fod.title}</h3>
                            <p>{fod.description}</p>
                            <p>Price: ₹{fod.price}</p>
                         
                            </div>
                            <div className={StyleSheet.Burger}>
                                  <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733292470/restaurant/cefjxbkcsk1onoihix6j.png' className={StyleSheet.BurgerImage}/>
                                  <div  className={StyleSheet.burgers}>
                                  <button type="button" onClick={() => addToCart(fod)} className={StyleSheet.burgers1}>+</button>
                                  </div>
                                 
                                  </div>
              
                    
                           
                        </div>
                    ))
                ) : (
                    <p>No food data available</p>
                )}
                </div>
               

            
              
            </div>
            <div className={StyleSheet.display1}>
                <h2>French Fries</h2>
                <div className={StyleSheet.foodDisplay1}>
                
                {food.length > 0 ? (
                    food.map((fod) => (
                        <div key={fod._id} className={StyleSheet.foodCard1}>
                            <div  className={StyleSheet.mcFood1}>
                            <h3>{fod.title}</h3>
                            <p>{fod.description}</p>
                            <p>Price: ₹{fod.price}</p>
                         
                            </div>
                            <div className={StyleSheet.Burger1}>
                                  <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733292703/restaurant/dwqfqjbmr6pptn5poxci.png' className={StyleSheet.BurgerImage1}/>
                                  <div  className={StyleSheet.bug1}>
                                  <button type="button" onClick={() => addToCart(fod)} className={StyleSheet.burgers12}>+</button>
                                  </div>
                                 
                                  </div>
              
                    
                           
                        </div>
                    ))
                ) : (
                    <p>No food data available</p>
                )}
                </div>
               

            
              
            </div>
            <div className={StyleSheet.display2}>
                <h2>French Fries</h2>
                <div className={StyleSheet.foodDisplay2}>
                
                {food.length > 0 ? (
                    food.map((fod) => (
                        <div key={fod._id} className={StyleSheet.foodCard2}>
                            <div  className={StyleSheet.mcFood2}>
                            <h3>{fod.title}</h3>
                            <p>{fod.description}</p>
                            <p>Price: ₹{fod.price}</p>
                         
                            </div>
                            <div className={StyleSheet.Burger2}>
                                  <img src='https://res.cloudinary.com/dy6uubcd1/image/upload/v1733292769/restaurant/n8lqchyuz5vhmctvnsrd.png' className={StyleSheet.BurgerImage2}/>
                                  <div  className={StyleSheet.bug2}>
                                  <button type="button" onClick={() => addToCart(fod)} className={StyleSheet.burgers123}>+</button>
                                  </div>
                                 
                                  </div>
              
                    
                           
                        </div>
                    ))
                ) : (
                    <p>No food data available</p>
                )}
                </div>
               

            
              
            </div>
            <div className={StyleSheet.DeliveryContainer}>
                <div className={StyleSheet.DeliveryContainer1}>
                    
                    <h5><img src={Locationss}/> Delivery Address</h5>
                    <p>Monday:8:00 AM 3:00 AM</p>
                    <p>Tuesday: 8:00 AM 3:00 AM </p>
                    <p>Wednesday: 8:00 AM 3:00 AM</p>
                    <p>Thursday: 8:00 AM 3:00 AM</p>
                    <p>Friday: 8:00 AM 3:00 AM</p>
                    <p>Sat: 8:00 AM 3:00 AM</p>
                    <p>Sunday: 8:00 AM 3:00 AM</p>
                    <p>Estimated time until delivery: 20 min</p>

                </div>
                <div className={StyleSheet.DeliveryContainer2}>
                <h5><img src={id}/> Contact Information</h5>
                    <p>If your have allergies or other salary<br/>
                    restrictions,please contact the restaurant.The <br/>
                    restaurant will provide food-specific<br/>
                    information upon request
                    </p>
                    <h4>Phone number<br/>
                    <p>+661 234 789</p>
                    </h4>
                    <h7>
                        website<br/>
                        http://mcdonalds.uk/

                    </h7>
                  


</div>
<div className={StyleSheet.DeliveryContainer3}>
<h5>Operational Times</h5>
                    <p>Monday:8:00 AM 3:00 AM</p>
                    <p>Tuesday: 8:00 AM 3:00 AM </p>
                    <p>Wednesday: 8:00 AM 3:00 AM</p>
                    <p>Thursday: 8:00 AM 3:00 AM</p>
                    <p>Friday: 8:00 AM 3:00 AM</p>
                    <p>Sat: 8:00 AM 3:00 AM</p>
                    <p>Sunday: 8:00 AM 3:00 AM</p>
                    


</div>

            </div>

            <div className={StyleSheet.mapContainer}>
                <h3>Find Us Here</h3>
                <div className={StyleSheet.mapWrapper}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.658267927121!2d0.11866331561952763!3d51.513337579635734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a78d70e92b01%3A0x3532a8f6aabed41d!2sMcDonald&#39;s%20East%20London!5e0!3m2!1sen!2suk!4v1698742342947!5m2!1sen!2suk"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className={StyleSheet.locationDetails}>
                    <h4>McDonald's East London</h4>
                    <p>123 High Street, East London, UK</p>
                    <p>Phone: +44 123 456 789</p>
                    <p>Website: <a href="https://www.mcdonalds.com/gb/en-gb.html" target="_blank" rel="noopener noreferrer">http://mcdonalds.uk/</a></p>
                </div>
            </div>
            <div  className={StyleSheet.parentContainer}>
               <img src={reviews} className={StyleSheet.snaper} />

            </div>
            <div className={StyleSheet.menu}>
                <p>Similar restaurants</p>
                <div className={StyleSheet.restaurants} >
                 
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1732775839/restaurant/McDonals.png"     onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1733288857/restaurant/lghxecjekulvt0bnznao.png"     onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1733288856/restaurant/xmzitotdlaoe6flcouxc.png"     onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1733288856/restaurant/dwxowxwrpvkav8zqd6ni.png"       onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1733288856/restaurant/povpolt5eguni1falg6c.png"      onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
                <img src="https://res.cloudinary.com/dy6uubcd1/image/upload/v1733288856/restaurant/lmg5diklangrhc50tnpm.png" onClick={() => navigate('/product', { state: { location, userName } })}              className={StyleSheet.mcdonals}   />
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

export default Product;
