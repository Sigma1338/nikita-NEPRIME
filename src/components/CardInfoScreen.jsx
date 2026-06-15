import { useState } from 'react';

export default function CardInfoScreen({ cardNumber, user, onBack }) {
  const [showNum, setShowNum] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const displayNum = showNum ? cardNumber : `**** **** **** ${cardNumber.slice(-4)}`;
  const displayCvv = showCvv ? `CVV: ${user.cvv}` : 'CVV: ***';

  return (
    <div className="screen active" id="screen-card-info" style={{ zIndex: 3 }}>
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2>Данные карты</h2>
      </div>
      
      <div className="credit-card-widget">
        <div className="card-top-row">
          <div class="card-chip"></div>
          <div className="contactless-icon">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14c-.3-1.4-.3-2.8 0-4.2"/><path d="M11.5 16.5c-.8-2.6-.8-5.3 0-8"/><path d="M14.5 19c-1.3-4-1.3-8 0-12"/><path d="M17.5 21.5c-1.8-5.5-1.8-11.1 0-16.5"/></svg>
          </div>
        </div>
        
        <div className="card-number" onClick={() => setShowNum(!showNum)}>{displayNum}</div>
        
        <div className="card-bottom-row">
          <div className="card-info-box" onClick={() => setShowCvv(!showCvv)}>{displayCvv}</div>
          <div className="card-info-box">12/30</div>
        </div>
        <div className="mir-logo-text">МИР</div>
      </div>
      
      <button className="btn-green" style={{ marginTop: 'auto' }} onClick={onBack}>Назад</button>
    </div>
  );
}