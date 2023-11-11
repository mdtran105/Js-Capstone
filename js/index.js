import { Product, CartItem, Cart } from './model.js';

const getEle = (selector) => document.querySelector(selector);
const formModal = document.querySelector('#productForm');
let idProdEdited = null;

const getProdInfo = () => {
  let prod = {};
  const elements = document.querySelectorAll(
    '#productForm input, #productForm select, #productForm textarea'
  );
  elements.forEach((element) => {
    const { name, value } = element;
    prod[name] = value;
  });

  return new Product(
    prod.name,
    prod.type,
    +prod.price,
    prod.screen,
    prod.backCamera,
    prod.frontCamera,
    prod.img,
    prod.desc,
  );
};

const renderAdmin = (prodList) => {
  let htmlContent = '';
  prodList.forEach(item => {
    htmlContent += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.screen}</td>
          <td>${item.backCamera}</td>
          <td>${item.frontCamera}</td>
          <td style="width:100px"><img class="img-fluid" src="${item.img}" alt="product image" /> </td>
          <td>${item.desc}</td>
          <td>${item.price}</td>
          <td>
            <button class="btn btn-warning" 
              onclick="editProd(${item.id})"
              data-toggle="modal"
              data-target="#exampleModal">Edit</button>
            <button class="btn btn-danger mt-1" 
              onclick="deleteProd(${item.id})">Delete</button>
          </td>
        </tr>`;
  });

  document.getElementById('tbodyProd').innerHTML = htmlContent;
};

const getProdList = () => {
  const promise = axios({
    url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
    method: 'GET'
  });

  promise.then(function (res) {
    renderAdmin(res.data);
  })
    .catch(function (err) {
      console.log(err);
    });
};

getProdList();

document.getElementById('btnAdd').onclick = () => {
  const prod = getProdInfo();
  console.log(prod);
  const promise = axios({
    url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
    method: 'POST',
    data: prod,
  });

  promise.then(function (res) {
    getProdList();
    formModal.reset();
    $('#addProdModal').modal('hide');
  })
    .catch(function (err) {
      console.log(err);
    });
};