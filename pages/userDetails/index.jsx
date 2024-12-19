import React, { useEffect, useState } from "react";
import StyleSheet from "./details.module.css";
import { useLocation } from "react-router-dom";
import image from "../../src/assets/Location.png";
import images from "../../src/assets/Basket.png";

import { updateUser } from "../services/index"; 
import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';

import male from "../../src/assets/Male User.png";
const Details = () => {
  const locate = useLocation();
  const userName = locate.state?.userName||[];
  const address = locate.state?.location ||[];
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    gender: "",
    country: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [displayCardDialog, setDisplayCardDialog] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [editCardIndex, setEditCardIndex] = useState(null);

  useEffect(() => {

    const storedDetails = {
      userName: localStorage.getItem("userName") || "",
      email: localStorage.getItem("email") || "",
      gender: localStorage.getItem("gender") || "",
      country: localStorage.getItem("country") || "",
    };
    setUserDetails(storedDetails);

    const storedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
    setSavedCards(storedCards);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveCard = () => {
    if (editCardIndex !== null) {

      const updatedCards = [...savedCards];
      updatedCards[editCardIndex] = cardDetails;
      setSavedCards(updatedCards);
    } else {

      setSavedCards((prevCards) => [...prevCards, cardDetails]);
    }


    localStorage.setItem("savedCards", JSON.stringify([...savedCards, cardDetails]));
    setCardDetails({ cardNumber: "", expiry: "", cvv: "" });
    setEditCardIndex(null);
    setDisplayCardDialog(false);
  };

  const handleEditCard = (index) => {
    setCardDetails(savedCards[index]);
    setEditCardIndex(index);
    setDisplayCardDialog(true);
  };

  const handleRemoveCard = (index) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
  };

  const handleCancelCard = () => {
    setCardDetails({ cardNumber: "", expiry: "", cvv: "" });
    setEditCardIndex(null);
    setDisplayCardDialog(false);
    
  };
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
 
    localStorage.setItem("userName", userDetails.userName);
    localStorage.setItem("email", userDetails.email);
    localStorage.setItem("gender", userDetails.gender);
    localStorage.setItem("country", userDetails.country);
  

    setEditMode(false);
  };
  

  return (
    <div className={StyleSheet.container}>
        <div className={StyleSheet.rowing}>
      <div className={StyleSheet.header}>
        <h4 className={StyleSheet.promo}>Get 60% off on your first order, Promo: Orders</h4>
        {address && <p className={StyleSheet.address}><img src={image} /> {address}</p>}
        
       
        <p className={StyleSheet.cart}>
          <img src={images} className={StyleSheet.img} alt="Cart" />
          My
           Cart
        </p>
        {userName && <p className={StyleSheet.userName} onClick={()=>navigate('/details')}><img src={male}/>Hello, {userName}</p>} 
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
      </div >
      
      <div className={StyleSheet.detailsContainer}>
      <h1 className={StyleSheet.heading}>&larr; My  Profile</h1>
      <div className={StyleSheet.mainSea}>     
        <p>{userDetails.userName}</p>
      <button
              onClick={() => setEditMode(true)}
              className={StyleSheet.edit}
            >
              Edit
            </button>
            </div>
 
        {editMode ? (
          <form className={StyleSheet.form} onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="userName"
                value={userDetails.userName}
                onChange={handleChange}
                required
                className={StyleSheet.editName}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                required
                className={StyleSheet.editName}
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleChange}
                required
                className={StyleSheet.editName}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                className={StyleSheet.editName}
              </select>
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={userDetails.country}
                onChange={handleChange}
                required
                className={StyleSheet.editName}
              />
            </div>
         
            <button type="submit" className={StyleSheet.Removal}>Save</button>
            <button type="button" onClick={() => setEditMode(false)} className={StyleSheet.Removal}>
              Cancel
            </button>
      
          </form>
        ) : (
          <>
          <div className={StyleSheet.name}>
            
       
            <div className={StyleSheet.names}>
              <p>
                <strong>Name:</strong> <br/>
                <p className={StyleSheet.usernames}>{userDetails.userName}</p>
              </p>
              <p>
                <strong>Email:</strong>  <br/>
                <p className={StyleSheet.usernames}>{userDetails.email}</p>
              </p>
            </div>
            <div className={StyleSheet.gender}>
              <p>
                <strong>Gender:</strong>  <br/>
                <p className={StyleSheet.usernames}>{userDetails.gender}</p> 
              </p>
              <p>
                <strong>Country:</strong>  <br/>
                
                <p className={StyleSheet.usernames}>{userDetails.country}</p>
              </p>
            </div>
          
            </div>
          </>
        )}
      </div>

      <div className={StyleSheet.cardPayments}>
        <h2>Saved Payments</h2>
        <div className={StyleSheet.cardDetails}>
          <p
            className={StyleSheet.addingCard}
            onClick={() => setDisplayCardDialog(true)}
          >
            + Add new card
          </p>
          {savedCards.map((card, index) => (
            <div key={index} className={StyleSheet.cardItem}>
              <p>
                <strong>Card Number:</strong> {"xxxxx-xxxxx-"}
                {card.cardNumber.slice(-4)}
              </p>
              <p>
                <strong>{userDetails.userName}</strong> 
              </p>
              <div className={StyleSheet.cardActions}>
              <p onClick={() => handleEditCard(index)} className={StyleSheet.Edit}>Edit</p>
                   
          <p onClick={() => handleRemoveCard(index)} className={StyleSheet.removals}>Remove</p>
          </div>
             
            </div>
          ))}
        </div>
      </div>

      {displayCardDialog && (
        <div className={StyleSheet.cardDialog}>
          <div className={StyleSheet.cardDialogHeader}>
          <h5>{editCardIndex !== null ? "Edit Card Payments" : "Add New Card"}</h5>
          <div   className={StyleSheet.cardNumber}>
            <label>Card Number:</label>
        
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              required
              className={StyleSheet.cardNumbers}
            
            />
          </div>
          <div   className={StyleSheet.cardNumber}>
            <label>Expiry:</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              required
              className={StyleSheet.cardNumbers}
            />
          </div>
          <div   className={StyleSheet.cardNumber}>
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              required
              className={StyleSheet.cardNumbers}
            />
    
          </div>
          <div className={StyleSheet.Removals}>

 

          <button onClick={handleSaveCard} className={StyleSheet.remove}>Save</button>
          <button onClick={handleCancelCard}className={StyleSheet.remove}>Cancel</button>
          </div>
      
  
          </div>
          
        </div>
      )}
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

export default Details;
