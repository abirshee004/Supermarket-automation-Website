let cart = [];
let totalAmount = 0;

function addToCart(product, price, quantity) {
  quantity = parseInt(quantity);
  const item = {
    product: product,
    price: price,
    quantity: quantity
  };

  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  totalAmount = 0;

cart.forEach((item , Index ) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - ₹ ${item.price} x ${item.quantity} = ₹ ${item.price * item.quantity}`;
    cartList.appendChild(li);

    totalAmount += item.price * item.quantity;
  });

  document.getElementById('total').textContent = totalAmount;
} 
