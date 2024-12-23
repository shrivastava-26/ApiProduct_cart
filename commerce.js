let search = document.getElementById("input");
let card = document.getElementById("card");

//! fetch cart from local storage..........

let pCart = localStorage.getItem('cart') || [];
let cart = JSON.parse(pCart)

// =====================================%%%%%%=========================================

//! api fetching function

let fetchApi = async () => {
  let data = await fetch("https://dummyjson.com/products");
  let finalData = await data.json();

  //!products in the form of array
  let arr = finalData.products;

  //! Display whole products through api
  arr.map((m) => {
     card.innerHTML +=`
        <div class="hello">
            <h3>ID: ${m.id}</h3>
            <h4>Title: ${m.title}</h4>
            <img src="${m.images[0]}" alt="${m.title}" />
            <p>Desc: ${m.description.slice(0, 65)}...</p>
            <h3>Category: ${m.category}</h3>
            <h4>Price: $${m.price}</h4>
            <button onclick="addToCart(${m.id}, '${m.title}', ${
             m.price })">Add to Cart</button>
        </div>
      `;
  })

  //! search functionality by eventlistner
  search.addEventListener('keyup', ()=> {

    let inputValue = search.value.toLowerCase();

    let res = arr.filter((m)=> 
        m.title.toLowerCase().includes(inputValue)
    )
    //! updated ui after searching
    card.innerHTML = res.map(
      (m) => `
        <div class="hello">
            <h3>ID: ${m.id}</h3>
            <h4>Title: ${m.title}</h4>
            <img src="${m.images[0]}" alt="${m.title}" />
            <p>Desc: ${m.description.slice(0, 65)}...</p>
            <h3>Category: ${m.category}</h3>
            <h4>Price: $${m.price}</h4>
            <button onclick="addToCart(${m.id}, '${m.title}', ${ m.price}, ${m.images[0]})">Add to Cart</button>
        </div>
    `
    );

  })

};

//todo ============================*****************=======================================

// ! Add to cart function
function addToCart(id, title, price, images) {

  let  exist = cart.find((m) => m.id === id);

  if (exist) {
    exist.quantity += 1; //if already exists than  quantity increase
  } else {
    cart.push({ id, title, price, images, quantity: 1 }); //otherwise a dd new product in the kart
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // updatae the cart
  displayCart(); // update cart display
}

//todo======================================== Display Cart=================================================================
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  cartItems.innerHTML = cart.map((m) => `
    <div>
        <img src="${m.images}" alt="${m.title}" style="width: 50px; height: 50px;" />
        <p>${m.title} - $${m.price} x ${m.quantity} = $${Math.round(m.price * m.quantity)}</p>
    </div>
  `)

  const total = cart.reduce((acc, val) => 
    acc + (val.price * val.quantity),0);

  let res = Math.round(total);

  totalPrice.textContent = `Total Price: $${res}`;
}


//todo=========================================== Clear Cart=================================================================
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart)); // clear all data from local storage
// localStorage.clear();
  displayCart();
}

//todo =======================================Fetch API on load======================================================
fetchApi();
displayCart(); // items added in cart displayed by this function
