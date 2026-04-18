document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const proposalId = urlParams.get('id');

  if (!proposalId) {
    showError("Invalid Proposal Link. No ID provided.");
    return;
  }

  try {
    const response = await fetch(`/api/get-proposal?id=${proposalId}`);
    
    if (!response.ok) {
      throw new Error('Proposal not found or has expired.');
    }

    const data = await response.json();

    // Format currency
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const formattedPrice = formatter.format(data.price);

    // Set today's date
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('prop-date').textContent = new Date(data.createdAt).toLocaleDateString('en-US', dateOptions);

    // Populate DOM elements
    document.getElementById('prop-name').textContent = data.name;
    if (data.company) {
      document.getElementById('prop-company').textContent = data.company;
    } else {
      document.getElementById('prop-company').parentElement.innerHTML = `Prepared for <strong>${data.name}</strong>`;
    }

    document.getElementById('prop-package').textContent = data.package;
    document.getElementById('prop-price').textContent = formattedPrice;
    document.getElementById('prop-total').textContent = formattedPrice;

    if (data.desc) {
      document.getElementById('prop-desc').textContent = data.desc;
    }

    // Set up the Accept link to pass ONLY the proposal ID to the checkout page
    const acceptLink = document.getElementById('accept-link');
    const checkoutParams = new URLSearchParams();
    checkoutParams.set('proposalId', data.id);
    acceptLink.href = `/checkout?${checkoutParams.toString()}`;

  } catch (error) {
    showError(error.message);
  }
});

function showError(msg) {
  document.getElementById('prop-name').textContent = 'Error loading proposal';
  document.getElementById('prop-desc').textContent = msg;
  document.getElementById('accept-link').style.display = 'none';
}
