export default function HistoryScreen({ user, onBack }) {
  const formatCurrency = (amount) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 2 }).format(amount);

  return (
    <div className="screen active" id="screen-history" style={{ zIndex: 4 }}>
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2>История</h2>
      </div>
      
      <div className="scroll-area">
        {!user.history || user.history.length === 0 ? (
          <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '20px', color: '#666' }}>Нет операций</div>
        ) : (
          user.history.map((item, idx) => (
            <div key={idx} className={`history-item ${item.type}`}>
              <div className="history-info">
                <img src="/icon.png" className="history-icon" alt="icon" />
                <span className="history-title">{item.title}</span>
              </div>
              <strong style={{ whiteSpace: 'nowrap' }}>
                {item.type === 'plus' ? '+' : '-'} {formatCurrency(Math.abs(item.amount))}
              </strong>
            </div>
          ))
        )}
      </div>
      
      <button className="btn-green" style={{ marginTop: '10px' }} onClick={onBack}>Назад</button>
    </div>
  );
}