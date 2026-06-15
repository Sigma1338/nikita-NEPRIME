import { useState } from 'react';

export default function TransferContactsScreen({ db, sessionCard, onTransfer, showToast, onBack }) {
  const [targetCard, setTargetCard] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    onTransfer(targetCard.trim(), amount);
  };

  const selectContact = (card) => {
    setTargetCard(card);
    showToast("Получатель выбран");
  };

  const handleInput = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setTargetCard(formatted.substring(0, 19));
  };

  // Вычисляем внутренние контакты (база без себя)
  const internalContacts = Object.keys(db)
    .filter(c => c !== sessionCard)
    .map(c => ({
      card: c,
      name: db[c].name,
      initial: db[c].name.charAt(0),
      last4: c.slice(-4),
      bg: '#000'
    }));

  // Добавляем внешние банки
  const externalContacts = [
    { name: "Олег (Альфа)", card: "5555 1111 2222 3333", initial: "О", bg: "#444" },
    { name: "Маша (Т-Банк)", card: "2200 9999 8888 7777", initial: "М", bg: "#444" },
    { name: "Игорь (ВТБ)", card: "4276 5555 4444 1111", initial: "И", bg: "#444" }
  ].map(c => ({ ...c, last4: c.card.slice(-4) }));

  const allContacts = [...internalContacts, ...externalContacts];

  return (
    <div className="screen active" id="screen-transfer-contacts" style={{ zIndex: 4 }}>
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2>Отправка денег</h2>
      </div>
      
      <input 
        type="text" 
        className="input-field" 
        placeholder="Карта получателя" 
        value={targetCard}
        onChange={handleInput}
      />
      <input 
        type="number" 
        className="input-field" 
        placeholder="Сумма, ₽" 
        style={{ marginTop: '4px', letterSpacing: 'normal' }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn-green" style={{ padding: '6px', marginTop: '4px', height: '32px' }} onClick={handleSend}>
        Отправить ₽
      </button>
      
      <div className="scroll-area" style={{ marginTop: '10px' }}>
        <div className="contact-letter">Ваши контакты</div>
        <div id="contacts-container">
          {allContacts.map((contact, idx) => (
            <div key={idx} className="contact-row" onClick={() => selectContact(contact.card)}>
              <div className="avatar-circle" style={{ background: contact.bg }}>{contact.initial}</div>
              {contact.name} (..{contact.last4})
            </div>
          ))}
        </div>
      </div>
      
      <button className="btn-green" style={{ marginTop: '10px' }} onClick={onBack}>Назад</button>
    </div>
  );
}