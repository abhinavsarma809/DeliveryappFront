import React, { useEffect, useState } from "react";
import StyleSheet from "./details.module.css";
import { updateUser } from "../services/index"; // Import the update API function

const Details = () => {
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

  return (
    <div className={StyleSheet.container}>
      <h1 className={StyleSheet.heading}>User Details</h1>
      <div className={StyleSheet.detailsContainer}>
        {editMode ? (
          <form>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="userName"
                value={userDetails.userName}
                onChange={handleChange}
                required
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
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className={StyleSheet.names}>
              <p>
                <strong>Name:</strong> {userDetails.userName}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
            </div>
            <div className={StyleSheet.gender}>
              <p>
                <strong>Gender:</strong> {userDetails.gender}
              </p>
              <p>
                <strong>Country:</strong> {userDetails.country}
              </p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className={StyleSheet.edit}
            >
              Edit
            </button>
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
          <h1>{editCardIndex !== null ? "Edit Card Payments" : "Add New Card"}</h1>
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
    </div>
  );
};

export default Details;
