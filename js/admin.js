import { Product, CartItem, Cart } from './model.js';
import { turnOnLoading, renderAdmin, getProdList, renderShop, getShopProd } from './controller.js';

const getEle = (selector) => document.querySelector(selector);
const getAllEle = (selector) => document.querySelectorAll(selector);
const addForm = document.querySelector('#productForm');
const addModal = document.querySelector('#addProdModal');
const addProdBtn = document.getElementById('btnAdd');
const updateBtn = document.getElementById('btnUpdate');
let idProdEdited = null;

// When hide formModal in Admin page: hide updateBtn, display addBtn, reset form
addModal.addEventListener('hidden.bs.modal', () => {
  addProdBtn.style.display = 'block';
  updateBtn.style.display = 'none';
  addForm.classList.remove('was-validated');
  addForm.reset();
});

// First render product table
getProdList();

// Get product info from the Form modal to Add/Update
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
    prod.name.trim(),
    prod.type.trim(),
    +prod.price,
    prod.screen.trim(),
    prod.backCamera.trim(),
    prod.frontCamera.trim(),
    prod.img.trim(),
    prod.desc.trim(),
  );
};

addProdBtn.onclick = () => {
  if (!addForm.checkValidity()) {
    addForm.classList.add('was-validated');
  } else {
    const prod = getProdInfo();
    const promise = axios({
      url: 'https://654c2b2477200d6ba8589420.mockapi.io/phones',
      method: 'POST',
      data: prod,
    });

    promise.then(() => {
      getProdList();
      $('#addProdModal').modal('hide');
    })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.deleteProd = (prodId) => {
  turnOnLoading();
  const promise = axios({
    url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${prodId}`,
    method: 'DELETE',
  });

  promise.then(() => {
    getProdList();
  })
    .catch((err) => {
      console.log(err);
    });
};

// Fill out the product information formModal to edit.
window.editProd = (prodId) => {
  idProdEdited = prodId;

  const promise = axios({
    url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${prodId}`,
    method: 'GET',
  });
  promise.then((res) => {
    updateBtn.style.display = 'block';
    addProdBtn.style.display = 'none';
    const prod = res.data;
    getEle('#name').value = prod.name;
    getEle('#type').value = prod.type;
    getEle('#price').value = prod.price;
    getEle('#frontCamera').value = prod.frontCamera;
    getEle('#backCamera').value = prod.backCamera;
    getEle('#screen').value = prod.screen;
    getEle('#img').value = prod.img;
    getEle('#desc').value = prod.desc;
    addForm.classList.add('was-validated');
  })
    .catch((err) => {
      console.log(err);
    });
};

// Get data updated and save to api
updateBtn.onclick = () => {
  if (!addForm.checkValidity()) {
    // addForm.classList.add('was-validated');
  } else {
    const prod = getProdInfo();
    const promise = axios({
      url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${idProdEdited}`,
      method: 'PUT',
      data: prod,
    });

    promise.then(() => {
      getProdList();
      $('#addProdModal').modal('hide');
    })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Search by product name
getEle('#btnSearch').onclick = () => {
  const nameSearch = getEle('#nameSearch').value;
  if (!nameSearch) {
    getProdList();
  } else {
    const tdName = getAllEle('#tbodyProd tr td:nth-of-type(2)');
    const nameEle = [...tdName].find(ele => ele.textContent === nameSearch);
    if (!nameEle) {
      renderAdmin([]);
    } else {
      // previousElementSibling of name cell is id cell
      const prodId = nameEle.previousElementSibling.textContent;
      const promise = axios({
        url: `https://654c2b2477200d6ba8589420.mockapi.io/phones/${prodId}`,
        method: 'GET',
      });
      promise.then((res) => {
        renderAdmin([res.data]);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

window.sortTable = (n) => {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.textContent.replace(',', '')) > Number(y.textContent.replace(',', ''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.textContent.replace(',', '')) < Number(y.textContent.replace(',', ''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};
