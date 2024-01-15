const productCardsContainer = document.querySelector("#product-cards-container");
const cartCardsContainer = document.querySelector("#cart-cards-container");
const emptyMessage = document.querySelector("#empty-message");
const totalPrice = document.querySelector("#total-price")

// Update the count of the product and cart section
function updateCountAndCart(e,count){
    // update the count in the ui and in js
    e.target.parentNode.children[1].innerText = count;
    let selectedProduct = e.target.parentNode.parentNode.children[0].innerText;
    productList.forEach((prod) => {
        if(prod.name === selectedProduct){
            prod.count = count;
        }
    })
    // update the cart
    cartCardsContainer.innerHTML = "";
    let total = 0;

    productList.forEach((prod) => {
        if(prod.count > 0){
            let div = document.createElement("div");
            div.innerHTML = `
                <p>${prod.name}</p>
                <p><span class="item-count">${prod.count}</span> x <span class="item-price">${prod.price}</span></p>
            `
            total += prod.count * prod.price
            div.classList.add("product-card")
            cartCardsContainer.appendChild(div);
        }
    })
    
    totalPrice.innerText = total;

    // show the empty message if there are no products added to cart
    if(cartCardsContainer.children.length === 0){
        cartCardsContainer.appendChild(emptyMessage);
    }
}


// Creates the product list when the page is loaded
window.onload = () => {
    productList.forEach((prod) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p class="product-name">${prod.name}</p>
            <p class="product-price">${prod.price}</p>
            <div class="counter-container">
                <p class="decrease control">-</p>
                <p class="count">0</p>
                <p class="increase control">+</p>
            </div>
        `
        div.classList.add("product-card")
        productCardsContainer.appendChild(div);
    })
}

productCardsContainer.addEventListener("click",(e) => {

    let count = 0;

    // increase or decrease count according to the switch pressed
    if(e.target.innerText === "+"){
        count = Number(e.target.parentNode.children[1].innerText);
        count++;
        updateCountAndCart(e,count);
    } else if(e.target.innerText === "-"){
        count = Number(e.target.parentNode.children[1].innerText);
        if(count > 0){
            count--;
        } else {
            alert("Add some product");
            return;
        }
        updateCountAndCart(e,count);
    }
})

const productList = [
    {id: 1, name: "Product-1", price:100},
    {id: 2, name: "Product-2", price:200},
    {id: 3, name: "Product-3", price:300}
 
];