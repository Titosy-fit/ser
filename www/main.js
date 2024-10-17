let orders = JSON.parse(localStorage.getItem('orders')) || [];

        function addToOrder(name, price) {
            const existingOrder = orders.find(order => order.name === name);
            if (!existingOrder) {
                orders.push({ name, price, quantity: 1 });
                updateOrderCount();
                localStorage.setItem('orders', JSON.stringify(orders)); // Enregistre dans localStorage
            } else {
                alert("Vous avez déjà commandé ce plat.");
            }
        }

        function updateOrderCount() {
            const orderCountElement = document.querySelector('.order-count');
            orderCountElement.textContent = orders.length;
        }

        updateOrderCount(); // Met à jour le compteur au chargement



        