document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Extract parameters or use defaults
  const clientName = urlParams.get('name') || 'Valued Client';
  const companyName = urlParams.get('company') || '';
  const packageTitle = urlParams.get('package') || 'Framework Systems Build-Out';
  const description = urlParams.get('desc');
  // price is assumed to be in dollars (e.g., 500 for $500.00). If not provided, fallback to 500
  const priceDollars = parseFloat(urlParams.get('price')) || 500.00;

  // Format currency
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const formattedPrice = formatter.format(priceDollars);

  // Set today's date
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('prop-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

  // Populate DOM elements
  document.getElementById('prop-name').textContent = clientName;
  if (companyName) {
    document.getElementById('prop-company').textContent = companyName;
  } else {
    // hide the "at Company" part if no company provided
    document.getElementById('prop-company').parentElement.innerHTML = `Prepared for <strong>${clientName}</strong>`;
  }

  document.getElementById('prop-package').textContent = packageTitle;
  document.getElementById('prop-price').textContent = formattedPrice;
  document.getElementById('prop-total').textContent = formattedPrice;

  if (description) {
    document.getElementById('prop-desc').textContent = description;
  }

  // Set up the Accept link to pass price and package to checkout page
  const acceptLink = document.getElementById('accept-link');
  
  // Build checkout URL
  const checkoutParams = new URLSearchParams();
  checkoutParams.set('price', priceDollars);
  checkoutParams.set('package', packageTitle);
  
  acceptLink.href = `/checkout?${checkoutParams.toString()}`;
});
