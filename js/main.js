

var productName = document.getElementById('prName');
var productPrice = document.getElementById('prPrice');
var ProductCat = document.getElementById('prCat');
var productDesc = document.getElementById('prDesc');
var addbtn = document.getElementById('addbtn');

var products = [];

var current = 0;

if (JSON.parse(localStorage.getItem('Products')) != null) {
    products = JSON.parse(localStorage.getItem('Products'));
    Display();
}


addbtn.onclick = function () {

    if(addbtn.innerHTML=='Add Product'){
        addProduct();
    }
    else{
        Update();
    }
    
    Display();
    Clear();
}

function addProduct() {
    product = {
        name: productName.value,
        price: productPrice.value,
        category: ProductCat.value,
        deescreption: productDesc.value,
    }

    products.push(product);
    localStorage.setItem('Products', JSON.stringify(products));

}

function Display() {
    var table = '';

    for (var i = 0; i < products.length; i++) {
        table += `<tr>
       <td>${products[i].name}</td>
       <td>${products[i].price}</td>
       <td>${products[i].category}</td>
       <td>${products[i].deescreption}</td>
       <td><button onclick='Delete(${i})' class="btn btn-danger">Delete</button></td>
       <td><button onclick='getProInfo(${i})' class="btn btn-warning">Update</button></td>
       </tr>`
    }
    document.getElementById('tabody').innerHTML = table;
}

function Delete(index) {

    products.splice(index, 1);
    Display();
    localStorage.setItem('Products', JSON.stringify(products));

}


function Clear() {
    productName.value = '';
    productPrice.value = '';
    ProductCat.value = '';
    productDesc.value = '';
}

var searchInput = document.getElementById('searchInput');

searchInput.onkeyup = function () {
    var table = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            table += `<tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].deescreption}</td>
    <td><button onclick='Delete(${i})' class="btn btn-danger">Delete</button></td>
    <td><button onclick='getProInfo(${i})' class="btn btn-warning">Update</button></td>
    </tr>`
        }
    }
    document.getElementById('tabody').innerHTML = table;
}


///Update 

function getProInfo(index) {

    current = index;
    var currentProduct = products[index];
    productName.value = currentProduct.name;
    productPrice.value = currentProduct.price;
    ProductCat.value = currentProduct.category;
    productDesc.value = currentProduct.deescreption;

    addbtn.innerHTML = 'Update Product'

}

function Update() {
    product = {
        name: productName.value,
        price: productPrice.value,
        category: ProductCat.value,
        deescreption: productDesc.value,
    }
    products[current] = product;
    localStorage.setItem('Products', JSON.stringify(products));
    addbtn.innerHTML ='Add Product'

}