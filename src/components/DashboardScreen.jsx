export default function DashboardScreen({ user, onLogOut, onNavigate }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', currency: 'RUB', minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="screen active" id="screen-dashboard">
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2 id="dashboard-user-title" style={{ fontSize: '16px' }}>СберБанк</h2>
      </div>
      
      <div className="balance-container">
        <div className="ruble-sign">₽</div>
        <div className="balance-box">
          <div className="balance-label">Мой Баланс</div>
          <div id="dashboard-balance" className="balance-amount">
            {formatCurrency(user.balance)}
          </div>
        </div>
      </div>
      
      <div className="white-menu-block">
        <div className="menu-row" onClick={() => onNavigate('transfer-menu')}>Переводы</div>
        <div className="menu-row" onClick={() => onNavigate('card-info')}>О карте</div>
        <div className="menu-row" onClick={onLogOut} style={{ color: 'var(--danger-color)' }}>Выйти</div>
      </div>
    </div>
  );
}