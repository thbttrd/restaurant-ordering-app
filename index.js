import { menuArray } from "./data";

const orderSummaryElt = document.getElementById('order-summary')
const orderElt = document.getElementById('order')
const menuDiv = document.getElementById("menu")
const totalElt = document.getElementById("total")
const modal = document.getElementById("modal");
const completeOrderBtn = document.getElementById("complete-order-btn");
const paymentForm = document.getElementById("payment-form");
let totalPrice = 0
let orderButtonIsAvailable = false

//initialize the page
document.addEventListener("DOMContentLoaded", function() {
    renderMenu(menuArray)
    initializeModalEvents()     
});

function renderMenu(menuArray) {
    menuArray.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        const emoji = document.createElement("span");
        emoji.classList.add("emoji");
        emoji.textContent = item.emoji;

        const itemDetails = document.createElement("div");
        itemDetails.classList.add("item-details");

        const itemName = document.createElement("h2");
        itemName.textContent = item.name;

        const itemIngredients = document.createElement("p");
        itemIngredients.textContent = item.ingredients.join(", ");

        const itemPrice = document.createElement("span");
        itemPrice.classList.add("price");
        itemPrice.textContent = `$${item.price}`;

        const addButton = document.createElement("button");
        addButton.classList.add("add-btn");
        addButton.textContent = "+";
        addButton.addEventListener("click", () => {
            addToOrder(item);
        });

        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemIngredients);
        itemDetails.appendChild(itemPrice);

        menuItem.appendChild(emoji);
        menuItem.appendChild(itemDetails);
        menuItem.appendChild(addButton);

        menuDiv.appendChild(menuItem);
    });
}

function addToOrder(item) {
    // Implement the logic to add the item to the order
    const orderItemContainer = document.createElement("div");
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItemContainer.classList.add("order-item-container");
    const itemName = document.createElement('span')
    itemName.textContent = item.name
    const removeItemBtn = document.createElement('button')
    removeItemBtn.classList.add('remove-btn')
    removeItemBtn.innerText = 'remove'
    removeItemBtn.addEventListener("click", (e) => {
        removeFromOrder(e, item);
    });       
    const itemPrice = document.createElement('span')
    itemPrice.textContent = `$${item.price}`
    orderItem.appendChild(itemName)
    orderItem.appendChild(removeItemBtn)
    orderItemContainer.appendChild(orderItem)
    orderItemContainer.appendChild(itemPrice)
    totalPrice += item.price
    orderSummaryElt.appendChild(orderItemContainer)
    renderTotalPrice()

}

function removeFromOrder(e, item) {
    e.target.parentElement.parentElement.remove()
    totalPrice -= item.price
    renderTotalPrice()
}

function renderTotalPrice(){
    orderButtonIsAvailable = totalPrice > 0
    document.getElementById("complete-order-btn").disabled = !orderButtonIsAvailable
    totalElt.innerText = `$${totalPrice}`
}

function initializeModalEvents(){

    paymentForm.addEventListener('submit', function(e){
        e.preventDefault()
        processPayment()
    })

    completeOrderBtn.addEventListener("click", () => {
        modal.style.display = "flex"; // Show the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            hideModal()
        }
    });
    const payBtn = document.querySelector(".pay-btn")
    // payBtn.addEventListener("click", () => {
    //     processPayment()
    // });
    
}

function hideModal(){
    modal.style.display = "none"; // Hide the modal
}

function processPayment(){    

    const thanksItem = document.createElement("div");
    thanksItem.classList.add("thanks-item");
    thanksItem.textContent = "Thanks! Your order is on it's way!"
    orderElt.innerHTML = ""
    orderElt.appendChild(thanksItem)
    hideModal()
   
}