export default function TransferMenuScreen({ onNavigate, onBack }) {
  return (
    <div className="screen active" id="screen-transfer-menu" style={{ zIndex: 3 }}>
      <div className="screen-header">
        <img src="/icon.png" className="header-logo-img" alt="Логотип" />
        <h2>Сервисы</h2>
      </div>
      <div className="white-menu-block" style={{ marginTop: '15px' }}>
        <div className="menu-row" onClick={() => onNavigate('transfer-contacts')}>Кому перевести</div>
        <div className="menu-row" onClick={() => onNavigate('history')}>История операций</div>
      </div>
      <button className="btn-green" style={{ marginTop: '20px' }} onClick={onBack}>Назад</button>
    </div>
  );
}