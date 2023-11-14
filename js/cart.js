import { CartItem, Cart } from './model.js';
import { renderCartTable } from './controller.js';

let prodArr = JSON.parse(localStorage.getItem('prodArr_LOCAL')) || [];
if (localStorage.getItem('prodArr_LOCAL')) {
  prodArr = prodArr.map(item => new CartItem(
    item.id,
    item.name,
    item.img,
    item.price,
    item.quantity,
  ));
}
const cart = new Cart(prodArr);
renderCartTable(cart);

const storeToLocal = () => localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));

window.removeItem = (prodId) => {
  cart.removeItem(prodId);
  storeToLocal();
  renderCartTable(cart);
};

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