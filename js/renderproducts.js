// renderProducts.js
import { fetchProducts } from "./api.js";

// Contenedor de productos
const productContainer = document.getElementById("product-list");

// Función para crear una tarjeta de producto
function createProductCard(product) {
    return `
        <div class="product">
            <img src="${product.image}" alt="Imagen de ${product.name}" class="product-image">
            <p class="product-name">${product.name}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
    `;
}

// Función para renderizar los productos
export async function renderProducts() {
    try {
        productContainer.innerHTML = ""; // Limpiar contenedor
        const products = await fetchProducts(); // Obtener productos desde la API
        if (products.length === 0) {
            productContainer.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }
        const productCards = products.map(createProductCard).join(""); // Generar tarjetas
        productContainer.innerHTML = productCards; // Insertar tarjetas
    } catch (error) {
        console.error("Error al renderizar productos:", error);
        productContainer.innerHTML = "<p>Error al cargar productos. Intenta nuevamente más tarde.</p>";
    }
}

