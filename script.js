
function toggleChat() {
  const box = document.getElementById('chatBox');
  box.style.display = (box.style.display === 'flex' ? 'none' : 'flex');
}
function autoChat() {
  if (!document.getElementById('chatBox').style.display || document.getElementById('chatBox').style.display === 'none') {
    toggleChat();
    const body = document.getElementById('chatBody');
    body.innerHTML = '<div><b>Ассистент:</b> Здравствуйте, чем могу помочь?</div>';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setInterval(autoChat, 20000);
});
