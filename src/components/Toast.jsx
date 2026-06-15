export default function Toast({ message, isVisible }) {
  return (
    <div id="toast" className={isVisible ? 'show' : ''}>
      {message}
    </div>
  );
}