
document.addEventListener('DOMContentLoaded', () => {
  // Auto open chat after 20s of inactivity
  let timeout;
  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      document.getElementById('chatBox').style.display = 'flex';
      document.getElementById('chatBody').innerHTML = '<div><b>Ассистент:</b> Здравствуйте, чем могу помочь?</div>';
    }, 20000);
  };
  document.addEventListener('mousemove', resetTimeout);
  document.addEventListener('keydown', resetTimeout);
  resetTimeout();

  // Chat toggle
  document.querySelector('.chatbot-icon').addEventListener('click', () => {
    const box = document.getElementById('chatBox');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
  });
});
