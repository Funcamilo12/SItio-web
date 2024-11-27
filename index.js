const btnCart = document.querySelector('.icon-cart')

const containerCartProducts = document.querySelector('.container-carts-products')
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})