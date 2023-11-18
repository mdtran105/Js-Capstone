import { CartItem, Cart } from './model.js';
import { renderPopupCart, getShopProd } from './controller.js';

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

const storeToLocal = () => localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));

/* When customer visit page again or reload page after adding item to cart,
 check any update of product in cart vs API */
if (cart.prodArr.length) {
  const promiseList = cart.prodArr.map(item => {
    return axios({
      url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${item.id}`,
      method: 'GET',
    });
  });
  Promise.allSettled(promiseList).then((res) => {
    res.forEach((item, index) => {
      if (item.status === 'fulfilled') {  //If item is still available in API -> update
        const product = item.value.data;
        const itemInCart = cart.prodArr[index];
        itemInCart.name = product.name;
        itemInCart.img = product.img;
        itemInCart.price = product.price;
      } else if (item.status === 'rejected') { //else, delete it from Cart
        cart.prodArr.splice(index, 1);
      }
    });
    storeToLocal();
    renderPopupCart(cart.prodArr);
    getShopProd();
  })
    .catch((err) => {
      console.log(err);
    });
} else { //if the cart is empty, just render
  getShopProd();
  renderPopupCart(cart.prodArr);
}

window.addCart = (prodId) => {
  const promise = axios({
    url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${prodId}`,
    method: 'GET',
  });
  promise.then((res) => {
    const prod = res.data;
    const item = new CartItem(
      prod.id,
      prod.name,
      prod.img,
      prod.price,
      1,
    );
    cart.addItem(item);
    localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));
    renderPopupCart(cart.prodArr);
  }
  )
    .catch((err) => {
      console.log(err);
    });
};

window.removeItem = (prodId) => {
  cart.removeItem(prodId);
  localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));
  renderPopupCart(cart.prodArr);
};

// Assign function to filter product by type button
window.getShopProd = getShopProd;