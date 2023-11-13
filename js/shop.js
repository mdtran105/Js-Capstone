import { Product, CartItem, Cart } from './model.js';
import { turnOnLoading, renderPopupCart, getProdList, renderShop, getShopProd } from './controller.js';

const getEle = (selector) => document.querySelector(selector);
const getAllEle = (selector) => document.querySelectorAll(selector);

let prodArr = JSON.parse(localStorage.getItem('prodArr_LOCAL')) || [];
if (localStorage.getItem('prodArr_LOCAL')) {
  prodArr = prodArr.map(item => new CartItem(
    item.id,
    item.name,
    item.img,
    item.price,
    item.quantity,
  ));
  renderPopupCart(prodArr);
}

getShopProd();

window.addCart = (prodId) => {
  const promise = axios({
    url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${prodId}`,
    method: 'GET',
  });
  promise.then((res) => {
    const prod = res.data;
    const findItem = prodArr.find(item => item.id == prod.id);
    if (findItem) {
      findItem.quantity += 1;
    } else {
      const item = new CartItem(
        prod.id,
        prod.name,
        prod.img,
        prod.price,
        1,
      );
      prodArr.push(item);
    }
    localStorage.setItem('prodArr_LOCAL', JSON.stringify(prodArr));
    renderPopupCart(prodArr);
  })
    .catch((err) => {
      console.log(err);
    });
};