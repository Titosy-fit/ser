let orders = JSON.parse(localStorage.getItem('orders')) || [];

function displayOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    let total = 0;

    orders.forEach((order, index) => {
        const subtotal = order.price * order.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.price} MGA</td>
            <td>
                <input type="number" value="${order.quantity}" min="1" 
                       onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>${subtotal} MGA</td>
            <td><button class="remove-btn" onclick="removeOrder(${index})">Supprimer</button></td>
        `;
        orderList.appendChild(row);
    });

    document.getElementById('totalAmount').textContent = ' ' + total + ' MGA';
}

function updateQuantity(index, newQuantity) {
    orders[index].quantity = parseInt(newQuantity);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
}

function removeOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrders();
}

function sendOrder() {
    if (orders.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    const orderNumber = 'CMD' + Date.now().toString().slice(-5);
    let confirmationMessage = `<h3>Facture de Commande</h3>`;
    confirmationMessage += `<p>Numéro de Commande : <strong>${orderNumber}</strong></p>`;
    confirmationMessage += `<ul>`;

    orders.forEach(order => {
        confirmationMessage += `<li>${order.name} - ${order.quantity} × ${order.price} MGA</li>`;
    });

    confirmationMessage += `</ul>`;
    confirmationMessage += `<p>Total : <strong>${document.getElementById('totalAmount').textContent}</strong></p>`;
    confirmationMessage += `<p>Votre commande est en attente de traitement.</p>`;

    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;
    document.getElementById('confirmationMessage').style.display = 'block';

    // Envoyer la commande au serveur
    orders.forEach(order => {
        saveCommande(order);
    });

    // Réinitialiser le panier
    orders = [];
    localStorage.removeItem('orders');
    displayOrders();
}

function saveCommande(commande) {
    fetch('http://localhost:3000/api/commande', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Erreur:', error));
}

displayOrders();
