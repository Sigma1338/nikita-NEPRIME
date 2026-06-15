import { useState } from 'react';

export default function PinScreen({ user, onPinSuccess }) {
  const [pin, setPin] = useState('');

  const pressPin = (digit) => {
    if (pin.length < 5) setPin(prev => prev + digit);
  };

  const clearLast = () => setPin(prev => prev.slice(0, -1));

  const submitPin = () => {
    if (pin.length < 5) return alert("Введите 5 цифр");
    if (user.pin === pin) {
      onPinSuccess(); // ПИН верный, идем в дашборд
    } else {
      alert("Неверный ПИН!");
      setPin(''); // Сбрасываем кружочки
    }
  };

  return (
    <div className="screen active" id="screen-pin">
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2 id="pin-greeting">Привет,<br/>{user.name}</h2>
      </div>
      
      {/* Отрисовка кружочков ПИН-кода */}
      <div className="pin-display">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`pin-cell ${i < pin.length ? 'filled' : ''}`}></div>
        ))}
      </div>

      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button key={num} className="num-btn" onClick={() => pressPin(num.toString())}>
            {num}
          </button>
        ))}
        <button className="num-btn red" onClick={clearLast}>←</button>
        <button className="num-btn" onClick={() => pressPin('0')}>0</button>
        <button className="num-btn green" onClick={submitPin}>✔</button>
      </div>
    </div>
  );
}