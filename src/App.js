import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { words } from "./words"; // Adjust path as needed
import "./App.css";
import PrivacyPolicyPopup from "./PrivacyPolicyPopup"; // Import the Privacy Policy Popup
import HowToPlayPopup from "./HowToPlayPopup"; // Import the How to Play Popup

function App() {
  const [currentWord, setCurrentWord] = useState("Guess It");
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false); // State for popup
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false); // State for How to Play popup

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Effect to handle speech recognition logic
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (gameStarted && isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [gameStarted, isListening]);

  useEffect(() => {
    if (!gameStarted || transcript.trim() === "") return;

    if (transcript.trim().toLowerCase() === currentWord.toLowerCase()) {
      markCorrect();
    } else if (!currentWord.toLowerCase().includes(transcript.trim().toLowerCase())) {
      setTimeout(() => resetTranscript(), 1000); // Delay by 1 second
    }
  }, [transcript, currentWord, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    nextWord();
    setIsListening(true); // Start listening
  };

  const nextWord = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    resetTranscript(); // Clear transcript when moving to the next word
  };

  const markCorrect = () => {
    setScore((prevScore) => prevScore + 1);
    nextWord();
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
    setIsListening(!isListening); // Toggle listening state
  };

  // Function to open the privacy policy popup
  const openPrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(true);
  };

  // Function to close the privacy policy popup
  const closePrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(false);
  };

  // Function to open the How to Play popup
  const openHowToPlay = () => {
    setIsHowToPlayOpen(true);
  };

  // Function to close the How to Play popup
  const closeHowToPlay = () => {
    setIsHowToPlayOpen(false);
  };

  return (
    <div className="container">
      {gameStarted && (
        <div className="score">
          Score: {score}
        </div>
      )}

      {/* Display the word to guess */}
      <div className="word-display">
        {currentWord}
      </div>

      {/* Start screen or game buttons */}
      {!gameStarted ? (
        <div className="start-screen">
          <button className="button play" onClick={startGame}>
            Play
          </button>
        </div>
      ) : (
        <>
          {/* Display the user's spoken words */}
          <div className="transcript-display">
            <p>Speaking: <strong>{transcript}</strong></p>
          </div>
          <button className="button correct" onClick={markCorrect}>
            Correct
          </button>
          <button className="button next" onClick={nextWord}>
            Next
          </button>
          <button className="button toggle" onClick={toggleListening}>
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </>
      )}

      {/* Privacy Policy footer */}
      <footer className="footer">
        <p className="privacy-policy">
          We do not save any of your data or voice recordings. Your privacy is our priority.{" "}
          <a href="#" onClick={openPrivacyPolicy} className="privacy-policy-link">
            Read our Privacy Policy
          </a>.
        </p>
      </footer>

      {/* Display Privacy Policy Popup */}
      <PrivacyPolicyPopup 
        isOpen={isPrivacyPolicyOpen} 
        onClose={closePrivacyPolicy} 
      />

      {/* Display How to Play Popup */}
      <HowToPlayPopup 
        isOpen={isHowToPlayOpen} 
        onClose={closeHowToPlay} 
      />

      {/* Help and How to Play Buttons */}
      <div className="help-buttons">
        <button className="button help" onClick={openHowToPlay}>?</button>
      </div>
    </div>
  );
}

export default App;
