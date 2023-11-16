export function turnOnLoading() {
  document.getElementById('spinner').style.display = 'flex';
}
export function turnOffLoading() {
  document.getElementById('spinner').style.display = 'none';
}

export const renderAdmin = (prodList) => {
  let htmlContent = '';
  prodList.forEach(item => {
    htmlContent += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td style="width:100px"><img class="img-fluid" src="${item.img}" alt="product image" /> </td>
          <td>${item.type}</td>
          <td>${item.screen}</td>
          <td>${item.backCamera}</td>
          <td>${item.frontCamera}</td>
          <td>${item.desc}</td>
          <td>${item.price.toLocaleString()}</td>
          <td>
            <button class="btn btn-warning d-block" 
              onclick="editProd(${item.id})"
              data-bs-toggle="modal"
              data-bs-target="#addProdModal">Edit</button>
            <button class="btn btn-danger mt-1 d-block" 
              onclick="deleteProd(${item.id})">Delete</button>
          </td>
        </tr>`;
  });

  document.getElementById('tbodyProd').innerHTML = htmlContent;
};

export const getProdList = () => {
  turnOnLoading();
  const promise = axios({
    url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
    method: 'GET'
  });

  promise.then((res) => {
    renderAdmin(res.data);
    turnOffLoading();
  })
    .catch((err) => {
      console.log(err);
      turnOffLoading();
    });
};

export const renderShop = (prodList) => {
  let htmlContent = '';
  prodList.forEach(item => {
    htmlContent += `
        <div class="col-lg-3 col-md-4 col-sm-6 mt-40">
          <div class="single-product-wrap">
            <div class="product-image">
              <a href="#">
                <img class="img-fluid" src="${item.img}" alt="Product Image">
              </a>
            </div>
            <div class="product_desc mx-4 mt-4">
              <div class="product_desc_info">
                <div class="product-review">
                  <div class="rating-box">
                    <ul class="rating">
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li><i class="fa fa-star"></i></li>
                      <li class="no-star"><i class="fa fa-star"></i></li>
                    </ul>
                  </div>
                </div>
                <h4><a class="product_name mb-1" href="#">${item.name}</a></h4>
                <p class="mb-0 desc" >${item.desc}</p>
                <div class="utility">
                  <p class="mb-0">Camera sau: ${item.backCamera}</p>
                  <p class="mb-1">Camera trước: ${item.frontCamera}</p>
                </div>
                <div class="price-box">
                  <span class="new-price">$${item.price.toLocaleString()}</span>
                </div>
              </div>
              <div class="add-actions px-3">
                <ul class="add-actions-link">
                  <button class="add-cart" onclick="addCart(${item.id})">Add to cart</button>
                </ul>
              </div>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById('renderDiv').innerHTML = htmlContent;
};

export const getShopProd = (filter = 'all') => {
  turnOnLoading();
  const promise = axios({
    url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
    method: 'GET'
  });

  promise.then((res) => {
    if (filter == 'all') {
      renderShop(res.data);
    } else {
      renderShop(res.data.filter(item => item.type.toLowerCase() == filter));
    }
    turnOffLoading();
  })
    .catch((err) => {
      console.log(err);
      turnOffLoading();
    });
};

export function renderPopupCart(prodArr) {
  const itemCountSpan = document.querySelector('.cart-item-count');
  let len = prodArr.length;
  itemCountSpan.textContent = len;

  let htmlContent = '';
  prodArr.forEach(item => {
    htmlContent += `
        <li>
          <a class="minicart-product-image">
            <img class="img-fluid" src="${item.img}" alt="cart products">
          </a>
          <div class="minicart-product-details">
            <h6><a>${item.name}</a></h6>
            <span>$${item.price.toLocaleString()} x ${item.quantity}</span>
          </div>
          <button class="close" title="Remove" onclick="removeItem(${item.id})">
            <i class="fa fa-close"></i>
          </button>
        </li>
    `;
  });
  document.querySelector('.minicart-product-list').innerHTML = htmlContent;
}

export function renderCartTable(cart) {
  let htmlContent = '';
  cart.prodArr.forEach(item => {
    htmlContent += `
        <tr>
          <td class="li-product-thumbnail" style="width:150px">
            <img class="img-fluid" src="${item.img}"
                alt="Product Image">
          </td>
          <td class="li-product-name"><a>${item.name}</a></td>
          <td class="li-product-price">
            <span class="amount">$${item.price.toLocaleString()}</span>
          </td>
          <td class="quantity">
            <div class="cart-plus-minus">
              <input class="cart-plus-minus-box" value="${item.quantity}" type="text" id="${item.id}">
              <div class="dec qtybutton" onclick="changeQuant('d',${item.id})"><i class="fa fa-angle-down"></i></div>
              <div class="inc qtybutton" onclick="changeQuant('i',${item.id})"><i class="fa fa-angle-up"></i></div>
            </div>
          </td>
          <td class="product-subtotal"><span class="amount">$${(cart.itemTotal(item.id)).toLocaleString()}</span></td>
          <td class="li-product-remove">
            <button class="close d-inline-block" title="Remove" onclick="removeItem(${item.id})">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>
    `;
  });
  document.querySelector('#tbodyCart').innerHTML = htmlContent;
  document.querySelector('#totalBill').textContent = `$${cart.cartTotal().toLocaleString()}`;
}

