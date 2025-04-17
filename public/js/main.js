// Wait until the entire html document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle delete buttons

  // Selects all elements with the name delete-btn 
  document.querySelectorAll('.delete-btn').forEach(button => {

    // adds an event listener (Detects user interactions for when they
    // click) and adds that to the delete-btn
    button.addEventListener('click', async (e) => {
      // Get the productId from the dataset
      const productId = e.target.dataset.id;

      // asks the user to confirm blah blah blah
      if (confirm('Are you sure you want to delete this product?')) {
        // If the user confirms then
        try {
          // sends a DELETE request to the server
          const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
          });
          // If the DELETE response works / sends to the server
          if (response.ok) {
            // Checks to see if the user is on the /products page
            if (window.location.pathname === '/products') {
              // Remove from DOM if on list page so the user cannot see it
              const productCard = e.target.closest('.product-card');
              productCard.remove();
            } else {
              // In case the user is on the products details page, It redirects
              // the user back to the products page
              window.location.href = '/products';
            }
          } else {
            // if the deletion fails then you show an alert
            alert('Failed to delete the product');
          }
          // catching an error
        } catch (err) {
          // if something went wrong with sending a delete request to the
          // server then show in the console an error message
          console.error('Error:', err);
          alert('An error occurred while deleting the product');
        }
      }
    });
  });

  // Handle search functionality

  // Make a const that gets the 'search' id
  const searchInput = document.getElementById('search');

  // if the searchInput exists on the page
  if (searchInput) {
    // add an input event listener to filterProducts
    // What is an input event listener? Something that changes the input element depending on what the user does
    searchInput.addEventListener('input', filterProducts);
  }
  // Handle category filter

  // Initilize a const variable categoryfilter by the Id of 
  // 'category-filter'
  const categoryFilter = document.getElementById('category-filter');
  // If the categoryFilter exists on the page
  if (categoryFilter) {
    // Add a event listener to change filterProducts when a category
    // -filter is selected.
    categoryFilter.addEventListener('change', filterProducts);
  }
});// Filters products based 
function filterProducts() {
      // get the item and category and set them to lowre case
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value.toLowerCase();
      // for each product create a product card
      document.querySelectorAll('.product-card').forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.querySelector('.category').textContent.toLowerCase();
        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !category || productCategory.includes(category);
        // Either make the style block or none depeneding if it is in the category
        if (matchesSearch && matchesCategory) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }

// Handle form submission with validation
const productForm = document.getElementById('productForm');
if (productForm) { // Check if the product form exits
  productForm.addEventListener('submit', function (e) { // On form submit
    // Get the data name, price, category from the product form
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const categoryInput = document.getElementById('category');
    // Store isValid as true and errorMessage to an empty to string to change later
    let isValid = true;
    let errorMessage = '';
    // If the name of the product isnt valid (doesnt have a value) change isValid to false and set a valid error message
    if (!nameInput.value.trim()) {
      isValid = false;
      errorMessage += 'Product name is required\n';
    }
    // If the name of the product isnt valid (doesnt have a value, isnt a number, or price is less than or equal to zero)
    // change isValid to false and set a valid error message
    if (!priceInput.value || isNaN(priceInput.value) || Number(priceInput.value) <= 0) {
      isValid = false;
      errorMessage += 'Price must be a positive number\n';
    }
    // If the category isnt valid (doesnt have a value)
    //  change isValid to false and set a valid error message
    if (!categoryInput.value) {
      isValid = false;
      errorMessage += 'Please select a category\n';
    }
    // If isValid is false => stop the function from running and display the error message
    if (!isValid) {
      e.preventDefault();
      alert(errorMessage);
    }
  });
}
