
const products = [
  {id:1,name:"Динозавр",price:2500,age:5,gender:"boy",img:"https://source.unsplash.com/200x200/?dinosaur,toy"},
  {id:2,name:"Робот",price:3500,age:4,gender:"boy",img:"https://source.unsplash.com/200x200/?robot,toy"},
  {id:3,name:"Машинка",price:1500,age:3,gender:"boy",img:"https://source.unsplash.com/200x200/?car,toy"},
  {id:4,name:"Кукла",price:1800,age:3,gender:"girl",img:"https://source.unsplash.com/200x200/?doll,toy"},
  {id:5,name:"Пони",price:2200,age:4,gender:"girl",img:"https://source.unsplash.com/200x200/?pony,toy"},
  {id:6,name:"Ракета",price:3200,age:5,gender:"girl",img:"https://source.unsplash.com/200x200/?rocket,toy"}
];

function renderList(containerId, filterFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  products.filter(filterFn).forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price} ₸</p>
      <button>В корзину</button> <button>В избранное</button>
    `;
    container.appendChild(card);
  });
}

function renderSections() {
  renderList('popular-list', p => [1,2,4].includes(p.id));
  renderList('new-list', p => [3,5,6].includes(p.id));
  renderList('summer-list', p => [2,3,5].includes(p.id));
  renderList('family-list', p => [1,4,6].includes(p.id));
}

function toggleChat() {
  const box = document.getElementById('chatBox');
  box.style.display = (box.style.display === 'flex' ? 'none':'flex');
}

function autoChat() {
  toggleChat();
  const content = document.getElementById('chatContent');
  content.innerHTML = `<div><b>Ассистент:</b> Здравствуйте, чем могу помочь?</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSections();
  setTimeout(autoChat, 20000);
});
