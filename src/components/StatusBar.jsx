import { useState, useEffect } from 'react';

export default function StatusBar({ isDark }) {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    };
    
    updateTime(); // Устанавливаем время сразу
    const timer = setInterval(updateTime, 1000); // Обновляем каждую секунду
    
    return () => clearInterval(timer); // Очищаем таймер при удалении компонента
  }, []);

  // Меняем цвет текста в зависимости от фона экрана
  const textColor = isDark ? '#fff' : '#000';

  return (
    <div id="status-bar" style={{ color: textColor }}>
      {time}
    </div>
  );
}