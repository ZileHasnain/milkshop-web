let cart = [];

function addToCart(name, unitPrice, inputId, unitLabel) {
  const quantity = parseFloat(document.getElementById(inputId).value);
  
  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const itemTotal = unitPrice * quantity;
  
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.name === name);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].total += itemTotal;
  } else {
    cart.push({ name, unitPrice, quantity, unitLabel, total: itemTotal });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const cartTotalDisplay = document.getElementById('cart-total');
  
  cartList.innerHTML = '';
  let grandTotal = 0;

  cart.forEach(item => {
    grandTotal += item.total;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.quantity} ${item.unitLabel} = $${item.total.toFixed(2)}`;
    cartList.appendChild(li);
  });

  cartTotalDisplay.textContent = grandTotal.toFixed(2);
}

function payWithStripe() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Replace this link with your actual Stripe Payment Link from dashboard.stripe.com
  const stripePaymentLink = "https://buy.stripe.com/test_your_custom_link";
  window.open(stripePaymentLink, '_blank');
}

function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const shopPhoneNumber = "1234567890"; // Put your WhatsApp phone number with country code here
  let orderText = "Hello! I would like to place an order:\n\n";
  let grandTotal = 0;

  cart.forEach(item => {
    orderText += `• ${item.name}: ${item.quantity} ${item.unitLabel} ($${item.total.toFixed(2)})\n`;
    grandTotal += item.total;
  });

  orderText += `\n*Total Price:* $${grandTotal.toFixed(2)}`;

  const whatsappUrl = `https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, '_blank');
}