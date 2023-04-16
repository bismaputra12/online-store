// take the necessary elements from html
const tableBody = document.querySelector('tbody');

// initialize the variables
let cartItems = [];

// function to merge items with the same name to become 1 item in a form of a list
function mergeItems() {
const mergedItems = [];
cartItems.forEach((item) => {
const existingItem = mergedItems.find(
(mergedItem) => mergedItem.title === item.title
);
if (existingItem) {
existingItem.qty += item.qty;
} else {
mergedItems.push(item);
}
});
cartItems = mergedItems;
}

// function to displayy cart items in a table form
function displayCartItems() {
tableBody.innerHTML = '';

if (cartItems.length === 0) {
const row = document.createElement('tr');
const emptyCell = document.createElement('td');
emptyCell.colSpan = 5;
emptyCell.textContent = 'Your cart is empty.';
row.appendChild(emptyCell);
tableBody.appendChild(row);
const homeBtn = document.createElement('button');
homeBtn.textContent = 'Go back to homepage';
homeBtn.classList.add('btn');
homeBtn.classList.add('btn-primary');
homeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
tableBody.appendChild(homeBtn);
} else {
  mergeItems();
  cartItems.forEach((item, index) => {
  const row = document.createElement('tr');
  const imageCell = document.createElement('td');
  const image = document.createElement('img');
  image.src = item.imageSrc;
  imageCell.appendChild(image);

  const titleCell = document.createElement('td');
  titleCell.textContent = item.title;

  const priceCell = document.createElement('td');
  priceCell.textContent = item.price;

  const qtyCell = document.createElement('td');
  qtyCell.textContent = item.qty;

  const removeCell = document.createElement('td');
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.classList.add('btn');
  removeBtn.classList.add('btn-danger');
  removeBtn.addEventListener('click', () => {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
  });
  removeCell.appendChild(removeBtn);

  row.appendChild(imageCell);
  row.appendChild(titleCell);
  row.appendChild(priceCell);
  row.appendChild(qtyCell);
  row.appendChild(removeCell);

  tableBody.appendChild(row);
});

// add a checkout button if cartItems is not empty
const checkoutBtn = document.createElement('button');
checkoutBtn.textContent = 'Checkout';
checkoutBtn.classList.add('btn');
checkoutBtn.classList.add('btn-success');
checkoutBtn.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});
tableBody.appendChild(checkoutBtn);
}
}

// function to take cart items from localStorage
function getCartItemsFromLocalStorage() {
if (localStorage.getItem('cartItems')) {
cartItems = JSON.parse(localStorage.getItem('cartItems'));
displayCartItems();
}
}

// call function getCartItemsFromLocalStorage when the page is loading
getCartItemsFromLocalStorage();