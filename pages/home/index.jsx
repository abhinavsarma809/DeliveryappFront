import React, { useState, useEffect } from 'react';
import { getImage } from '../services';
import StyleSheet from './home.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import images from "../../src/assets/Location.png";
import image from "../../src/assets/Basket.png";
 import order from "../../src/assets/order-food 1.png";
 import food from "../../src/assets/food 1.png";
 import order1 from "../../src/assets/order 1.png";
 import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';
import mains from '../../src/assets/mobileImage.jpeg';
import menu from '../../src/assets/menu.png';


const Home = () => {


    const navigate = useNavigate();
    const [imager, setImager] = useState([]);
    const [userName, setUserName] = useState(null);
    const [location, setLocation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tempLocation, setTempLocation] = useState('');
    const [True ,setTrue] = useState(false)



    useEffect(() => {
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
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName); 
        }
        fetchImage();
    }, []);
  
    const cut = () => {
        if (tempLocation.length > 10) {
            const truncated = tempLocation.substring(0, Math.ceil(tempLocation.length / 2));
            setLocation(truncated);
        } else {
            setLocation(tempLocation);
        }
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        setUserName(null); 
    };
    const toggleDown=()=>{
        setTrue((prevState)=>(!prevState))
    }
    const randomImages = [
        imager[0],
        imager[11],
        imager[12],
        imager[13],
        imager[14],
        imager[15],
        
    ];
    const handleImages=[
        imager[1],
    
    ]
    const offerImages=[
        imager[2],
        imager[3],
        imager[4]
    ]
    const catImages=[
        imager[5],
        imager[6],
        imager[7],
        imager[8],
        imager[9],
        imager[10],    
    ]
    const displayImages=[
        imager[16],
    ]
    const DisplayImages=[
        imager[17],
        imager[18],
    ]



    return (
        <div className={StyleSheet.container}>
            <div className={StyleSheet.reverse}>
            <div className={StyleSheet.header}>
                <p className={StyleSheet.orders}>Get 60% off on your first order, Promo: Orders</p>

                {/* Location section */}
                {!isEditing ? (
                    <p>
                        {location ? (
                            <>
                                <span><img src={images} alt="Location" /> {location}</span>{' '}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className={StyleSheet.changeButton}
                                >
                                    Change your location
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={StyleSheet.addButton}
                            >
                                Add your location
                            </button>
                        )}
                    </p>
                ) : (
                    <div className={StyleSheet.locationInput}>
                        <input
                            type="text"
                            value={tempLocation}
                            onChange={(e) => setTempLocation(e.target.value)}
                            placeholder="Enter your location"
                        />
                        <button onClick={cut} className={StyleSheet.saveButton}>
                            Save
                        </button>
                    </div>
                )}


                <p className={StyleSheet.cart} onClick={toggleDown}>
                    <img src={image} className={StyleSheet.basket} alt="Cart" />
                    My Cart
                </p>
                {userName && <p className={StyleSheet.userName}>Hey,{userName}</p>}

            
              
            </div>

            <div className={StyleSheet.mainbar}>
                <div className={StyleSheet.menuorders}>
                    
                <h1 className={StyleSheet.order}>Order</h1>
                <h1 className={StyleSheet.uk}>uk.</h1>
           
                </div>
                <img src={menu} className={StyleSheet.menur}/>
                
                <h4 className={StyleSheet.class}>Home</h4>
                <h4 className={StyleSheet.class1}>Browser Menu</h4>
                <p className={StyleSheet.class1}>specials offers</p>
                <p className={StyleSheet.class1}>Restaurants</p>
                <p className={StyleSheet.class1}>Track Order</p>

                <div className={StyleSheet.logsign}>
                    {userName ? (
                        <>
                            <p onClick={()=>navigate('/details',{state:{location,userName}})} className={StyleSheet.user}>Hey, {userName}</p>
                            <button onClick={handleLogout} className={StyleSheet.Logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <p onClick={() => navigate('/login')}>Login/</p>
                            <p onClick={() => navigate('/register')}>Signup</p>
                        </>
                    )}
                </div>
                
            </div>
               {True && 
               <div className={StyleSheet.cartDetails}>
                   <div className={StyleSheet.Baskets}>
                    <h3>My Basket</h3>
                    <p>Your cart is empty</p>
                    </div>
                </div>
            
}

</div>
<div className={StyleSheet.mains}>
<img src={mains}/>
</div>

{handleImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
       
                            className={StyleSheet.mainImage} 
                            alt={`Restaurant ${index + 1}`} 
                        />

                    ))}


   
            
<div className={StyleSheet.offers}>
    <h3 className={StyleSheet.h3}>up to 40% Order.uk.exclusive deals</h3>
    <p className={StyleSheet.vegan}>vegan</p>
    <p className={StyleSheet.vegan}>Sushi</p>

    <p className={StyleSheet.Pizza}>Pizza & Fast Food</p>
    <p className={StyleSheet.nadumu}>others</p>
    
    
    </div> 
    <div className={StyleSheet.offerImages}>
{offerImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
       
                            className={StyleSheet.mainImages} 
                            alt={`Restaurant ${index + 1}`} 
                        />
                    ))}
            
    </div>  
    <div className={StyleSheet.categories}>
        <h4>order.uk popular Categories</h4>
        <div className={StyleSheet.category}>
        {catImages.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
       
                            className={StyleSheet.categoryImages} 
                            alt={`Restaurant ${index + 1}`} 
                        />
                    ))}

        </div>


    </div>

<div className={StyleSheet.menu}>
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
            <div className={StyleSheet.displayImages}>
            {
              
            
           displayImages.map((img, index) => (
                <img 
                    key={index}
                    src={img} 

                    className={StyleSheet.displayImagess} 
                    alt={`Restaurant ${index + 1}`} 
                />
            ))
            }
            </div>
            <div className={StyleSheet.DisplayImages}>
            {
              
            
           DisplayImages.map((img, index) => (
                <img 
                    key={index}
                    src={img} 

                    className={StyleSheet.DisplayImagess} 
                    alt={`Restaurant ${index + 1}`} 
                />
            ))
            }
            </div>
            <div className={StyleSheet.Knowabout}>
                <div className={StyleSheet.support}>
                <h2>Know About Us!</h2>
                <h3 className={StyleSheet.questions}>Frequent Questions</h3>
                <p className={StyleSheet.questions}>who we are?</p>
                <p className={StyleSheet.questions}> Partner Program </p>
                <p className={StyleSheet.questions}> Help & Support</p>
                </div>
         
                <div className={StyleSheet.bigContianer}>
                    <div className={StyleSheet.content}>
                    <h7 className={StyleSheet.h7}>How does Order.UK work?</h7>
                    <h7>What payment methods are accepted?</h7>
                    <h7>Can I track my order in real-time?</h7>
                    <h7>Are there any special discounts<br/> or promotions available?</h7>
                    <h7>Is Order.UK available in my area?</h7>
             
           
                    </div>
                    <div className={StyleSheet.tracking}>
                    <div className={StyleSheet.contents}>
                    <div className={StyleSheet.PlaceOrder}>
                        <h3>Place order</h3>
                        <img src={order} className={StyleSheet.orderImages}/>
                        <p>Place order through our website or Mobile app</p>

                    </div>
                    <div className={StyleSheet.food}>
                        <h3>Track your Progess</h3>
                        <img src={food} className={StyleSheet.foodImages}/>
                        <p>Your can track your order status with delivery time</p>

                    </div>
                    <div className={StyleSheet.order1}>
                        <h3>Get Your Order Ready!</h3>
                        <img src={order1} className={StyleSheet.order1Images}/>
                        <p>Receive your order at a lighting fast speed!</p>

                    </div>
                 

                </div>
                <div className={StyleSheet.rows}>
                        <p>Order.UK simplifies the food ordering process. Browse through our diverse menu, <br/>
                            select your favorite dishes, and proceed to checkout.<br/>
                             Your delicious meal will be on its way to your doorstep in no time!</p>

                    </div>
                </div>
                </div>


            </div>
            <div className={StyleSheet.riders}>
                <div className={StyleSheet.riders1}>
                    <p>567+</p>
                    <p>Registered Riders</p>
                </div>
       
                <div className={StyleSheet.riders2}>
                    <p>789,900+</p>
                    <p>Orders Delivered</p>
                </div>
                <div className={StyleSheet.riders3}>
                    <p>690+</p>
                    <p>Restaurants Partnered</p>
                </div>
                <div className={StyleSheet.riders4}>
                    <p>17,457+</p>
                    <p>Food items</p>
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

export default Home;
