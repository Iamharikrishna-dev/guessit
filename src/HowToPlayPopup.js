import React from "react";
import "./HowToPlay.css"; // Import custom CSS for the popup

function HowToPlayPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h1>How to Play</h1>
        <p><strong>1. Roles:</strong> There are two players: Actor and Guesser.</p>
        <p><strong>2. Actor:</strong> The Actor will see a word on the screen and act it out without speaking.</p>
        <p><strong>3. Guesser:</strong> The Guesser watches the Actor’s performance and guesses the word by speaking it aloud.</p>
        <p><strong>4. Scoring:</strong> The Guesser earns a point each time they guess correctly. The game moves to the next word after each correct guess.</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default HowToPlayPopup;
