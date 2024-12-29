import React from "react";
import "./PrivacyPolicyPopup.css";

function PrivacyPolicyPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h1 className="popup-title">Privacy Policy</h1>
        <p><strong>Effective Date:</strong> [10-November-2024]</p>

        <p>Thank you for using <strong>Guess It</strong>. Your privacy is very important to us. This Privacy Policy outlines how we handle your data.</p>

        <h2>1. No Data Storage</h2>
        <p>We do not collect, store, or share any of your personal data, including your voice recordings or game performance.</p>

        <h2>2. Speech Recognition</h2>
        <p>This app uses your device's built-in speech recognition capabilities to match your spoken words with the displayed word. This process happens locally on your device, and no voice data is transmitted to our servers.</p>

        <h2>3. Third-Party Services</h2>
        <p>We do not integrate any third-party services that collect or store user data.</p>

        <h2>4. Children's Privacy</h2>
        <p>This app is designed for users of all ages. As no data is collected, there is no risk of exposure for younger users.</p>

        <h2>5. Your Consent</h2>
        <p>By using this app, you consent to this Privacy Policy.</p>

        <h2>6. Changes to This Policy</h2>
        <p>We may update this Privacy Policy occasionally. Any changes will be reflected here with a new "Effective Date." Please review this page periodically to stay informed.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at: [ guessitgames@outlook.com ]</p>

        <button className="popup-close" onClick={onClose}>
          ✖ 
        </button>
      </div>
    </div>
  );
}

export default PrivacyPolicyPopup;
