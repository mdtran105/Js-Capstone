export class Product {
  constructor(name, type, price, screen, backCamera, frontCamera, img, desc) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
  }
}

export class CartItem {
  constructor(id, name, img, price, quantity) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = quantity;
  }
}

export class Cart {
  constructor() {
    this.prodArr = new Array;
  }
  searchIndex(id) {
    return this.prodArr.findIndex(item => item.id == id);
  }
  addItem(cartItem) {
    const prodIndex = this.searchIndex(cartItem.id);
    if (prodIndex != -1) {
      this.prodArr[prodIndex].quantity += cartItem.quantity;
    } else {
      this.prodArr.push(cartItem);
    }
  }
  removeItem(id) {
    const prodIndex = this.searchIndex(id);
    this.prodArr.splice(prodIndex, 1);
  }
  updateQuant(id, value) {
    const prodIndex = this.searchIndex(id);
    this.prodArr[prodIndex].quantity = value;
  }
  itemTotal(id) {
    const prodIndex = this.searchIndex(id);
    return this.prodArr[prodIndex].price * this.prodArr[prodIndex].quantity;
  }
  cartTotal() {
    return this.prodArr.reduce((totalBill, item) =>
      totalBill += (item.quantity * item.price)
      , 0);
  }
}