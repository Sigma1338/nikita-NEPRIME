import { useState } from 'react';
import { defaultDb } from '../data';

export default function LoginScreen({ onValidCard, showToast }) {
  const [cardValue, setCardValue] = useState('');

  const handleInput = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardValue(formatted.substring(0, 19));
  };

  const handleValidate = () => {
    const trimmedCard = cardValue.trim();
    if (defaultDb[trimmedCard]) {
      onValidCard(trimmedCard);
    } else {
      showToast("Карта не найдена!");
    }
  };

  const fillTestCard = (card) => {
    setCardValue(card);
    showToast("Карта подставлена!");
  };

  return (
    <div className="screen active" id="screen-login">
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2>Вход в Сбер</h2>
      </div>
      
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
          Номер карты:
        </label>
        <input 
          type="text" 
          className="input-field" 
          placeholder="0000 0000 0000 0000" 
          value={cardValue}
          onChange={handleInput} 
        />
      </div>

      <div className="scroll-area" style={{ marginTop: '10px' }}>
        <div className="contact-letter">Тестовые карты (нажми):</div>
        <div className="contact-row" onClick={() => fillTestCard('2202 4927 2123 4143')}>Никита (ПИН: 11111)</div>
        <div className="contact-row" onClick={() => fillTestCard('2202 1111 2222 3333')}>Антон (ПИН: 22222)</div>
        <div className="contact-row" onClick={() => fillTestCard('2202 5555 5555 5555')}>Вова (ПИН: 33333)</div>
      </div>

      <button className="btn-green" onClick={handleValidate} style={{ marginTop: 'auto' }}>
        Далее
      </button>
    </div>
  );
}