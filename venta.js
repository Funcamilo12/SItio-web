const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-carts-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = JSON.parse(localStorage.getItem('cart')) || []; // Cargar desde localStorage

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(item => item.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(item => {
                if (item.title === infoProduct.title) {
                    item.quantity++;
                    return item;
                } else {
                    return item;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        saveCartToLocalStorage(); // Guardar en localStorage
        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(item => item.title !== title);
        saveCartToLocalStorage(); // Guardar en localStorage
        showHTML();
    }
});

// Función para guardar el carrito en localStorage
const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(allProducts));
};

// Función para mostrar HTML
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
        <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProduct);

        // Convertir el precio a número usando parseFloat
        const priceValue = parseFloat(product.price.replace(/[$.]/g, '').replace(',', '.'));

        total += priceValue * product.quantity; // Calcular el total
        totalOfProducts += product.quantity; // Contar la cantidad total de productos
    });

    // Mostrar el total en el formato correcto
    valorTotal.innerText = `$${total.toFixed(0)}`; // Formato a dos decimales
    countProducts.innerText = totalOfProducts; // Mostrar la cantidad total de productos
};

// Mostrar el carrito al cargar la página
showHTML(); 