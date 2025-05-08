
document.addEventListener('DOMContentLoaded', () => {
  // Inactivity auto-open chat
  let timeout;
  const reset = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      document.getElementById('chatBox').style.display = 'flex';
      document.getElementById('chatBody').innerHTML = '<div><b>Ассистент:</b> Здравствуйте, чем могу помочь?</div>';
    }, 20000);
  };
  document.addEventListener('mousemove', reset);
  document.addEventListener('keydown', reset);
  reset();

  // Chat toggle
  document.querySelector('.chatbot-icon').addEventListener('click', () => {
    const box = document.getElementById('chatBox');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
  });
});
