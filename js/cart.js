import { CartItem, Cart } from './model.js';
import { renderCartTable } from './controller.js';

// Initialize Cart
const cart = new Cart();
cart.prodArr = JSON.parse(localStorage.getItem('prodArr_LOCAL')) || [];
if (cart.prodArr.length) {
  cart.prodArr = cart.prodArr.map(item => new CartItem(
    item.id,
    item.name,
    item.img,
    item.price,
    item.quantity,
  ));
}

renderCartTable(cart);

const storeToLocal = () => localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));

window.removeItem = (prodId) => {
  cart.removeItem(prodId);
  storeToLocal();
  renderCartTable(cart);
};


// When customer click the check-out button, clear the Cart
const checkOutBtn = document.getElementById('checkOut');
checkOutBtn.onclick = () => {
  cart.prodArr = [];
  storeToLocal();
  renderCartTable(cart);
};

// function handle changing quantity when up/down button clicked
window.changeQuant = (direction, id) => {
  const inputEle = document.querySelector(`input[id = '${id}']`);
  let quant = +inputEle.value;
  
  if (direction == 'i') {
    quant += 1;
  } else if (direction == 'd' && quant > 1) {
    quant -= 1;
  }
  inputEle.value = quant;
  cart.updateQuant(id, quant);
  storeToLocal();

  //update Total value of item
  const trNode = inputEle.closest('tr');
  const spanTotal = trNode.querySelector('.product-subtotal .amount');
  spanTotal.textContent = `$${cart.itemTotal(id).toLocaleString()}`;

  //update Total value of Cart
  document.querySelector('#totalBill').textContent = `$${cart.cartTotal().toLocaleString()}`;

};