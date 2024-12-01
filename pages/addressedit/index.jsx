import React, { useState, useEffect } from "react";
import images from "../../src/assets/Basket.png";
import StyleSheet from "./address.module.css";
import { useLocation } from "react-router-dom";

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
      <div className={StyleSheet.header}>
        <h4>Get 60% off on your first order, Promo: Orders</h4>
        {address && <p>{address}</p>}
        {userName && <p>Hello, {userName}</p>}
        <p className={StyleSheet.cart}>
          <img src={images} className={StyleSheet.img} alt="Cart" />
          My Cart
        </p>
      </div>

      <div className={StyleSheet.mainbar}>
        <h2>Order</h2>
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
            <div className={StyleSheet.displayAddress}>
              
              {savedAddresses.map((addr, index) => (
                <>
               
                <div key={index} className={StyleSheet.savedAddress}>
                  <p>State: {addr.state}</p>
                  <p>City: {addr.city}</p>
                  <p>Address: {addr.address}</p>
                </div>
                </>
              ))}
            </div>
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
    </div>
  );
};

export default Address;
