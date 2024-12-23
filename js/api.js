// api.js

// URL base del servidor fake
const BASE_URL = "http://localhost:3000/products";

/**
 * Realiza una solicitud POST para agregar un nuevo producto.
 * @param {Object} product - Objeto que representa el producto a crear (name, price, image).
 * @returns {Promise<Object>} - Producto creado devuelto por el servidor.
 */
export async function addProduct(product) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicamos que los datos enviados son JSON
            },
            body: JSON.stringify(product), // Convertimos el objeto a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud POST: ${response.status} ${response.statusText}`);
        }

        // Devolvemos el producto creado como JSON
        return await response.json();
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        throw error;
    }
}

