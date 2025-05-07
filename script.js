
const products = [
  {id:1,name:"Динозавр",price:2500,age:5,gender:"boy",img:"https://source.unsplash.com/300x400/?dinosaur,toy"},
  {id:2,name:"Робот",price:3500,age:4,gender:"boy",img:"https://source.unsplash.com/300x400/?robot,toy"},
  {id:3,name:"Гоночная трасса",price:3200,age:6,gender:"boy",img:"https://source.unsplash.com/300x400/?race,track,toy"},
  {id:4,name:"Кукла",price:1800,age:3,gender:"girl",img:"https://source.unsplash.com/300x400/?doll,toy"},
  {id:5,name:"Паровозик",price:1500,age:3,gender:"girl",img:"https://source.unsplash.com/300x400/?train,toy"},
  {id:6,name:"Ракета",price:2200,age:5,gender:"girl",img:"https://source.unsplash.com/300x400/?rocket,toy"}
];

let cart = JSON.parse(localStorage.getItem('cart'))||[];
let favorites = JSON.parse(localStorage.getItem('favorites'))||[];

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function saveFavorites(){ localStorage.setItem('favorites', JSON.stringify(favorites)); }

function renderProducts(){
  const list = document.getElementById('product-list');
  const search = document.getElementById('search-input').value.toLowerCase();
  const maxPrice = parseInt(document.getElementById('price-input').value);
  const ageChecks = document.querySelectorAll('input[name="age-filter"]:checked');
  const ages = Array.from(ageChecks).map(ch=>parseInt(ch.value));
  list.innerHTML = '';
  products.filter(p=>{
    let ok = p.price<=maxPrice && p.name.toLowerCase().includes(search);
    const gender = document.body.dataset.gender;
    if(gender && p.gender!==gender) ok=false;
    if(ages.length && !ages.includes(p.age)) ok=false;
    return ok;
  }).forEach(p=>{
    const card = document.createElement('div');
    card.className='product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} ₸</p>
      <p>${p.age}+ лет</p>
      <button onclick="toggleCart(${p.id})">${cart.includes(p.id)?'Убрать из корзины':'В корзину'}</button>
      <button onclick="toggleFav(${p.id})">${favorites.includes(p.id)?'Убрать из избранного':'В избранное'}</button>
    `;
    list.appendChild(card);
  });
}

function toggleCart(id){
  const idx = cart.indexOf(id);
  if(idx===-1) cart.push(id); else cart.splice(idx,1);
  saveCart();
  renderProducts();
}

function toggleFav(id){
  const idx = favorites.indexOf(id);
  if(idx===-1) favorites.push(id); else favorites.splice(idx,1);
  saveFavorites();
  renderProducts();
}

function renderCart(){
  const list = document.getElementById('cart-list');
  list.innerHTML='';
  let total=0;
  cart.forEach(id=>{
    const p = products.find(x=>x.id===id);
    if(p){
      total+=p.price;
      const card = document.createElement('div');
      card.className='cart-card';
      card.innerHTML=`
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} ₸</p>
        <button class="remove" onclick="removeFromCart(${p.id})">Удалить</button>
      `;
      list.appendChild(card);
    }
  });
  document.getElementById('cart-total').innerText = 'Итого: ' + total + ' ₸';
}

function renderFavorites(){
  const list = document.getElementById('favorites-list');
  list.innerHTML='';
  favorites.forEach(id=>{
    const p = products.find(x=>x.id===id);
    if(p){
      const card = document.createElement('div');
      card.className='fav-card';
      card.innerHTML=`
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} ₸</p>
        <button class="remove" onclick="removeFromFav(${p.id})">Удалить</button>
      `;
      list.appendChild(card);
    }
  });
}

function removeFromCart(id){
  cart = cart.filter(x=>x!==id);
  saveCart();
  renderCart();
}

function removeFromFav(id){
  favorites = favorites.filter(x=>x!==id);
  saveFavorites();
  renderFavorites();
}

function checkout(){
  if(!cart.length){ alert('Корзина пуста'); return; }
  alert('Спасибо за покупку!'); cart=[]; saveCart(); renderCart();
}

document.addEventListener('DOMContentLoaded',()=>{
  const search = document.getElementById('search-input');
  const price = document.getElementById('price-input');
  const ageF = document.querySelectorAll('input[name="age-filter"]');
  if(document.getElementById('product-list')){
    search.addEventListener('input',renderProducts);
    price.addEventListener('input',renderProducts);
    ageF.forEach(ch=>ch.addEventListener('change',renderProducts));
    renderProducts();
  }
  if(document.getElementById('cart-list')) renderCart();
  if(document.getElementById('favorites-list')) renderFavorites();
});
