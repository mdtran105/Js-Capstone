import { CartItem, Cart } from './model.js';
import { renderPopupCart, getShopProd } from './controller.js';

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
const storeToLocal = () => localStorage.setItem('prodArr_LOCAL', JSON.stringify(cart.prodArr));

if (cart.prodArr.length) {
  const promiseList = cart.prodArr.map(item => {
    return axios({
      url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${item.id}`,
      method: 'GET',
    });
  });
  Promise.allSettled(promiseList).then((res) => {
    res.forEach((item, index) => {
      if (item.status === 'fulfilled') {
        const product = item.value.data;
        const itemInCart = cart.prodArr[index];
        itemInCart.name = product.name;
        itemInCart.img = product.img;
        itemInCart.price = product.price;
      } else if (item.status === 'rejected') {
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
} else {
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

// Assign function to filter product by type
window.getShopProd = getShopProd;