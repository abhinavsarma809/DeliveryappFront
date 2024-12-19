import React, { useState, useEffect } from "react";
import images from "../../src/assets/Basket.png";
import StyleSheet from "./address.module.css";
import { useLocation } from "react-router-dom";

import brand from '../../src/assets/Vector.png';
import group from '../../src/assets/Group.png';
import face from '../../src/assets/Facebook.png';
import insta from '../../src/assets/Instagram.png';
import snap from '../../src/assets/snap.png';
import twitter  from '../../src/assets/twitter.png';
import menu from '../../src/assets/Menu.png';

const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Address = () => {
  const location = useLocation();
  const address = location.state?.address || "no address";
  const userName = location.state?.userName || "Hello";

  const [True, setTrue] = useState(false);
  const [city, setCity] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]); // Array to store multiple addresses
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  // Load saved addresses from local storage when the component mounts
  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setSavedAddresses(addresses);
  }, []);

  const toggleDown = () => {
    setTrue((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setIsDropdownOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newAddress = {
      state: selectedState,
      city,
      address: enteredAddress,
    };

   
    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setTrue(false); // Close the form
    setSelectedState("");
    setCity("");
    setEnteredAddress("");
  };

  return (
    <div className={StyleSheet.container}>
      <div className={StyleSheet.rowing}>
      <div className={StyleSheet.header}>
        <h4 className={StyleSheet.off}>Get 60% off on your first order, Promo: Orders</h4>
        {address && <p className={StyleSheet.afer}>{address}</p>}
        {userName && <p className={StyleSheet.userName}>Hello, {userName}</p>}
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
                <img src={menu} className={StyleSheet.menuing}/>
                <h4 className={StyleSheet.class}>Home</h4>
                <h4 className={StyleSheet.class1}>Browser Menu</h4>
                <p className={StyleSheet.class1}>specials offers</p>
                <p className={StyleSheet.class1}>Restaurants</p>
                <p className={StyleSheet.class1}>Track Order</p>
                {userName && <p className={StyleSheet.user} onClick={()=>navigate('/details')}><img src={male}/>Hello, {userName}</p>} 
        
      </div>
      </div>
      <div className={StyleSheet.Edit}>
        <h2>&larr; Your Address</h2>
        <div className={StyleSheet.changeAddress}>
          <button className={StyleSheet.addAddress} onClick={toggleDown}>
            +
          </button>
          <div className={StyleSheet.changing}>
            <button className={StyleSheet.addAddress1}>{userName}</button>
            <button className={StyleSheet.addAddress2}>{address}</button>
          </div>

          {/* Display Saved Addresses */}
          {savedAddresses.length > 0 && (
 
              
              savedAddresses.map((addr, index) => (
                <>
               
                <div key={index} className={StyleSheet.savedAddress}>
                  <p>State: {addr.state}</p>
                  <p>City: {addr.city}</p>
                  <p>Address: {addr.address}</p>
                </div>
                </>
              ))
          
          )}

          {True && (
            <div className={StyleSheet.adding}>
              <div className={StyleSheet.adding1}>
                <p className={StyleSheet.enter}>Add Address</p>

                <div className={StyleSheet.inputContainer}>
                  <input
                    type="text"
                    placeholder="Select State"
                    value={selectedState}
                    onClick={toggleDropdown}
                    readOnly
                    className={StyleSheet.input}
                  />
                  <span className={StyleSheet.arrow}>
                    {isDropdownOpen ? "▲" : "▼"}
                  </span>
                  <input
                    type="text"
                    placeholder="City/District"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={StyleSheet.city}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Detailed Address"
                    value={enteredAddress}
                    onChange={(e) => setEnteredAddress(e.target.value)}
                    className={StyleSheet.inputs}
                  />
                </div>
                <button className={StyleSheet.save} onClick={handleSave}>
                  Save
                </button>

                {isDropdownOpen && (
                  <ul className={StyleSheet.dropdown}>
                    {statesList.map((state, index) => (
                      <li
                        key={index}
                        onClick={() => handleStateSelect(state)}
                        className={StyleSheet.dropdownItem}
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
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
  );
};

export default Address;
