async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");

      div.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Price:</strong> ₹${product.price}</p>
        </div>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

fetchProducts();
