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
  constructor(prodArr) {
    this.prodArr = prodArr;
  }
  addItem(cartItem) {
    let findProd = this.prodArr.find(item => item.id === cartItem.id);
    if (findProd) {
      findProd.quantity += cartItem.quantity;
    } else {
      this.prodArr.push(cartItem);
    }
  }
}