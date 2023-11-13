export function turnOnLoading() {
  document.getElementById('spinner').style.display = 'block';
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
            <button class="btn btn-warning" 
              onclick="editProd(${item.id})"
              data-bs-toggle="modal"
              data-bs-target="#addProdModal">Edit</button>
            <button class="btn btn-danger mt-1" 
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
                <img src="${item.img}" alt="Product Image">
              </a>
            </div>
            <div class="product_desc">
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
              <div class="add-actions">
                <ul class="add-actions-link">
                  <li class="add-cart active" onclick="addCart(${item.id})">Add to cart</li>
                  <li><a href="" title="quick view" class="quick-view-btn" data-toggle="modal"
                      data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  document.getElementById('renderDiv').innerHTML = htmlContent;
};

export const getShopProd = () => {
  turnOnLoading();
  const promise = axios({
    url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
    method: 'GET'
  });

  promise.then((res) => {
    renderShop(res.data);
    turnOffLoading();
  })
    .catch((err) => {
      console.log(err);
      turnOffLoading();
    });
};

export function renderPopupCart(prodArr){
  const itemCountSpan = document.querySelector('.cart-item-count');
  let len = prodArr.length;
  if (len) {
    itemCountSpan.textContent = len;
    itemCountSpan.style.display = 'block';
  }
}