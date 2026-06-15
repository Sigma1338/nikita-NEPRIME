export default function HomeScreen({ onNavigate }) {
  return (
    <div className="screen active" id="screen-home">
      <div className="app-shortcut" onClick={onNavigate}>
        <img 
          src="icon.png" 
          className="app-icon" 
          alt="СберБанк" 
        />
        <div className="app-label">СберБанк</div>
      </div>
    </div>
  );
}