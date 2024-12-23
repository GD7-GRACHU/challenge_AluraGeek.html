// Contenedor de productos
const productList = document.getElementById("product-list");

// Formulario para agregar productos
const productForm = document.getElementById("product-form");

// Función para crear un elemento de tarjeta de producto
function createProductCard(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = `Imagen de ${product.name}`;

    const name = document.createElement("p");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$ ${product.price.toFixed(2)}`;

    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(price);

    return productDiv;
}

// Función para renderizar todos los productos
async function renderProducts() {
    productList.innerHTML = ""; // Limpiar contenedor
    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        products.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al obtener los productos", error);
    }
}

// Evento para manejar el formulario de agregar productos
productForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevenir el envío del formulario

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const image = document.getElementById("image").value;

    // Crear un objeto de producto
    const newProduct = { name, price, image };

    // Agregar el nuevo producto a la API
    try {
        await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        // Renderizar productos nuevamente
        renderProducts();

        // Limpiar el formulario
        productForm.reset();
    } catch (error) {
        console.error("Error al agregar el producto", error);
    }
});

// Renderizar productos iniciales al cargar la página
renderProducts();
