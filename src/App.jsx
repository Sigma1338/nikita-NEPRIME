import { useState } from 'react';
import './sber.css'; 
import { defaultDb } from './data';

import StatusBar from './components/StatusBar';
import Toast from './components/Toast';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import PinScreen from './components/PinScreen';
import DashboardScreen from './components/DashboardScreen';
import CardInfoScreen from './components/CardInfoScreen';
import TransferMenuScreen from './components/TransferMenuScreen';
import TransferContactsScreen from './components/TransferContactsScreen';
import HistoryScreen from './components/HistoryScreen';

export default function App() {
  const [db, setDb] = useState(defaultDb);
  const [historyStack, setHistoryStack] = useState(['home']);
  const [sessionCard, setSessionCard] = useState('');
  
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const currentScreen = historyStack[historyStack.length - 1];
  const sessionUser = sessionCard ? db[sessionCard] : null;

  const navigateTo = (screenName) => {
    setHistoryStack(prev => [...prev, screenName]);
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      setHistoryStack(prev => prev.slice(0, -1));
    }
  };

  const handleLogOut = () => {
    setSessionCard('');
    setHistoryStack(['home']);
    showToast("Вы вышли из аккаунта");
  };

  // Главная функция обработки перевода
  const processTransfer = (targetCard, amountStr) => {
    const amount = parseFloat(amountStr);
    
    if (targetCard.length < 19) return showToast("Введите полную карту");
    if (targetCard === sessionCard) return showToast("Нельзя себе!");
    if (isNaN(amount) || amount <= 0) return showToast("Неверная сумма");
    if (amount > sessionUser.balance) return showToast("Недостаточно средств");

    // Создаем копию базы данных для обновления состояния
    const newDb = JSON.parse(JSON.stringify(db));
    const currentUserData = newDb[sessionCard];

    // Списываем деньги
    currentUserData.balance -= amount;

    let targetName = "Неизвестный банк";
    
    // Если получатель есть в нашей базе, зачисляем ему деньги
    if (newDb[targetCard]) {
      targetName = newDb[targetCard].name;
      newDb[targetCard].balance += amount;
      newDb[targetCard].history.unshift({
        title: `Перевод от ${currentUserData.name}`,
        amount: amount,
        type: "plus",
        icon: "icon.png"
      });
    }

    // Добавляем запись в историю отправителя
    currentUserData.history.unshift({
      title: `Перевод: ${targetName}`,
      amount: amount,
      type: "minus",
      icon: "/icon.png"
    });

    setDb(newDb);
    showToast(`Переведено ${amount} ₽!`);
    navigateTo('dashboard');
  };

  return (
    <div id="device-screen">
      <StatusBar isDark={currentScreen === 'home' || currentScreen === 'card-info'} />
      <Toast message={toastMsg} isVisible={toastVisible} />
      
      {currentScreen === 'home' && (
        <HomeScreen onNavigate={() => navigateTo('login')} />
      )}

      {currentScreen === 'login' && (
        <LoginScreen 
          showToast={showToast}
          onValidCard={(cardNumber) => {
            setSessionCard(cardNumber);
            navigateTo('pin');  
          }} 
        />
      )}

      {currentScreen === 'pin' && (
        <PinScreen 
          user={sessionUser} 
          showToast={showToast}
          onPinSuccess={() => {
            navigateTo('dashboard'); 
            showToast("Успешный вход");
          }} 
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen 
          user={sessionUser} 
          onNavigate={navigateTo}
          onLogOut={handleLogOut} 
        />
      )}

      {currentScreen === 'card-info' && (
        <CardInfoScreen 
          cardNumber={sessionCard}
          user={sessionUser}
          onBack={goBack}
        />
      )}

      {currentScreen === 'transfer-menu' && (
        <TransferMenuScreen 
          onNavigate={navigateTo}
          onBack={goBack}
        />
      )}

      {currentScreen === 'transfer-contacts' && (
        <TransferContactsScreen 
          db={db}
          sessionCard={sessionCard}
          onTransfer={processTransfer}
          showToast={showToast}
          onBack={goBack}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen 
          user={sessionUser}
          onBack={goBack}
        />
      )}
    </div>
  );
}
