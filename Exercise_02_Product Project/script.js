// fetch('')
//   .then(response => response.json())
//   .then(products => {
//     const container = document.querySelector('.products-container');
//     container.innerHTML = '';
//     products.forEach(product => {
//       const card = document.createElement('div');
//       card.className = 'product-card';
//       card.innerHTML = `
//         <img class="product-image" src="${product.image}" alt="Product Image">
//         <h2 class="product-title">${product.title}</h2>
//         <p>${product.description}</p>
//         <p class="product-price">Price: ${product.price}</p>
//         <button>Add to Cart</button>
//       `;
//       container.appendChild(card);
//     });
//   })
//   .catch(error => {
//     console.error('Error loading products:', error);
//   });

fetch('./data2.json')
  .then(res => res.json())
  .then(data => {
    // products array
    const products = data.products;
    // ratingə görə azalan sırala (ecoscore_score sahəsi)
    const sorted = products
      .filter(p => typeof p.ecoscore_score === 'number')
      .sort((a, b) => b.ecoscore_score - a.ecoscore_score)
      .slice(0, 50); // yalnız ilk 50 məhsul

    const container = document.querySelector('.products-container');
    container.innerHTML = '';
    sorted.forEach(product => {
      container.innerHTML += `
        <div class="product-card">
          <img class="product-image" src="${product.image_front_url || product.image_url || ''}" alt="${product.product_name || 'Product'}">
          <h2 class="product-title">${product.product_name || 'No name'}</h2>
          <p class="product-brand">Brand: ${product.brands || '-'}</p>
          <p class="product-desc">${product.ingredients_text || '-'}</p>
          <p class="product-quantity">Quantity: ${product.quantity || product.product_quantity + ' ' + (product.product_quantity_unit || '')}</p>
          <p class="product-rating">EcoScore: ${product.ecoscore_score || '-'}</p>
          <button>Add to Cart</button>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error('Error loading products:', err);
  });



let allProducts = [];

function renderProducts(products) {
  const container = document.querySelector('.products-container');
  container.innerHTML = '';
  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img class="product-image" src="${product.image_front_url || product.image_url || ''}" alt="${product.product_name || 'Product'}">
        <h2 class="product-title">${product.product_name || 'No name'}</h2>
        <p class="product-brand">Brand: ${product.brands || '-'}</p>
        <p class="product-desc">${product.ingredients_text || '-'}</p>
        <p class="product-quantity">Quantity: ${product.quantity || product.product_quantity + ' ' + (product.product_quantity_unit || '')}</p>
        <p class="product-rating">EcoScore: ${product.ecoscore_score || '-'}</p>
        <button>Add to Cart</button>
      </div>
    `;
  });
}

fetch('./data2.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data.products
      .filter(p => typeof p.ecoscore_score === 'number');
    renderProducts(allProducts);
  });

// Axtarış funksiyası
document.getElementById('Searcher_box').addEventListener('input', function(e) {
  const value = e.target.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    (product.product_name && product.product_name.toLowerCase().includes(value)) ||
    (product.brands && product.brands.toLowerCase().includes(value)) ||
    (product.ecoscore_score && product.ecoscore_score.toString().includes(value))
  );
  renderProducts(filtered);
});