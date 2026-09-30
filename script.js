const products = [
  {id:1,name:"Classic Oxford Shirt",cat:"shirt",price:1290,visual:"SHIRT"},
  {id:2,name:"Relaxed Fit Shirt",cat:"shirt",price:1490,visual:"SHIRT"},
  {id:3,name:"Urban Cargo Pant",cat:"pant",price:1790,visual:"PANT"},
  {id:4,name:"Classic Straight Pant",cat:"pant",price:1590,visual:"PANT"},
  {id:5,name:"Essential Oversized Hoodie",cat:"hoodie",price:1990,visual:"HOODIE"},
  {id:6,name:"Premium Zip Hoodie",cat:"hoodie",price:2290,visual:"HOODIE"}
];

let cart = JSON.parse(localStorage.getItem("urbanwear-cart") || "[]");
const productsEl=document.getElementById("products");

function money(n){return "৳"+n.toLocaleString("en-BD")}
function renderProducts(filter="all"){
  const list=filter==="all"?products:products.filter(p=>p.cat===filter);
  productsEl.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-img ${p.cat}-bg">${p.visual}</div>
      <div class="product-info">
        <h3>${p.name}</h3><p>Comfortable • Everyday fit</p>
        <span class="price">${money(p.price)}</span>
        <button class="btn buy" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const p=products.find(x=>x.id===id);
  cart.push(p);saveCart();renderCart();toggleCart(true);
}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart()}
function saveCart(){localStorage.setItem("urbanwear-cart",JSON.stringify(cart))}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div class="empty">Your cart is empty.</div>'}
  else el.innerHTML=cart.map((p,i)=>`<div class="cart-item"><span>${p.name}<br><b>${money(p.price)}</b></span><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function toggleCart(force){
  const cartEl=document.getElementById("cart"), overlay=document.getElementById("overlay");
  const open=force===true?true:!cartEl.classList.contains("open");
  cartEl.classList.toggle("open",open);overlay.classList.toggle("show",open);
}
function checkout(){
  if(!cart.length){alert("Your cart is empty.");return}
  const phone="8801872354376"; // CHANGE THIS TO YOUR WHATSAPP NUMBER
  const lines=cart.map(p=>`• ${p.name} - ${money(p.price)}`).join("%0A");
  const total=money(cart.reduce((s,p)=>s+p.price,0));
  const msg=`Hello UrbanWear!%0A%0AI want to order:%0A${lines}%0A%0ATotal: ${total}%0A%0AName:%0AAddress:%0APhone:`;
  window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");renderProducts(btn.dataset.filter);
}));
renderProducts();renderCart();
