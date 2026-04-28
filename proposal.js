const stripe = Stripe("pk_live_51LxuWvJHorGAQFmURsXldzs3RZnjUISP2nW40tBZn3AWcENddJeO65Mz8eNWRefw6TcbbMej38sWF550ayzUq6Ly00TabgRnV0");
let elements;
let paymentElement;
let isStripeMounted = false;
let currentProposalId = null;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const proposalId = urlParams.get('id');

  if (!proposalId) {
    showError("Invalid Proposal Link. No ID provided.");
    return;
  }

  currentProposalId = proposalId;

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
    const createdDate = new Date(data.createdAt);
    document.getElementById('prop-date').textContent = createdDate.toLocaleDateString('en-US', dateOptions);

    // Set Expiration Date (+7 days)
    const expiresDate = new Date(createdDate);
    expiresDate.setDate(expiresDate.getDate() + 7);
    
    const propExpires = document.getElementById('prop-expires');
    const urgencyBanner = document.getElementById('urgency-banner');
    
    if (propExpires && urgencyBanner) {
      propExpires.textContent = expiresDate.toLocaleDateString('en-US', dateOptions);
      
      if (new Date() <= expiresDate) {
        urgencyBanner.style.display = 'block';
      } else {
        urgencyBanner.style.display = 'block';
        urgencyBanner.style.background = 'rgba(255, 165, 0, 0.1)';
        urgencyBanner.style.borderColor = 'orange';
        urgencyBanner.innerHTML = `⚠️ This proposal expired on <span>${expiresDate.toLocaleDateString('en-US', dateOptions)}</span>`;
      }
    }

    // Populate DOM elements
    document.getElementById('prop-name').textContent = data.name;
    if (data.company) {
      document.getElementById('prop-company').textContent = data.company;
    } else {
      document.getElementById('prop-company').parentElement.innerHTML = `Prepared for <strong>${data.name}</strong>`;
    }

    document.getElementById('prop-package').textContent = data.package;
    document.getElementById('prop-title').textContent = `${data.package} Proposal`;
    document.getElementById('prop-price').textContent = formattedPrice;
    document.getElementById('prop-total').textContent = formattedPrice;
    
    const payBtnAmount = document.getElementById('pay-btn-amount');
    if (payBtnAmount) payBtnAmount.textContent = formattedPrice;

    if (data.desc) {
      document.getElementById('prop-desc').innerHTML = data.desc;
    }

    // Initialize Stripe Payment Intent in the background
    await initializeStripe(proposalId, Math.round(data.price * 100));

    // Handle "Accept & Pay Securely" click
    const acceptLink = document.getElementById('accept-link');
    if (acceptLink) {
      acceptLink.addEventListener('click', (e) => {
        e.preventDefault();
        acceptLink.style.display = 'none';
        const container = document.getElementById('payment-container');
        if (container) {
          container.classList.add('visible');
          
          // Mount Stripe AFTER the container is visible
          if (!isStripeMounted && paymentElement) {
            paymentElement.mount("#payment-element");
            isStripeMounted = true;
          }
        }
      });
    }

    // Handle Payment Submission
    const paymentForm = document.querySelector("#payment-form");
    if (paymentForm) {
      paymentForm.addEventListener("submit", handleSubmit);
    }
    
    // Check if coming back from redirect
    checkStatus();

  } catch (error) {
    showError(error.message);
  }
});

async function initializeStripe(proposalId, amountInCents) {
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId: proposalId, amount: amountInCents }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const { clientSecret } = await response.json();

    const appearance = {
      theme: 'night',
      variables: {
        fontFamily: '"Inter", "DM Sans", "Playfair Display", -apple-system, blinkmacsystemfont, sans-serif',
        colorPrimary: '#10b981',
        colorBackground: '#1a1a1a',
        colorText: '#ffffff',
        colorDanger: '#df1b41',
        spacingUnit: '4px',
        borderRadius: '4px',
      }
    };
    
    elements = stripe.elements({ clientSecret, appearance });

    const paymentElementOptions = {
      layout: "tabs",
    };

    paymentElement = elements.create("payment", paymentElementOptions);
    // Removed mount() here. We will mount it when the Accept button is clicked.
  } catch (error) {
    console.error("Stripe Initialization Failed:", error);
    showMessage("Failed to initialize checkout securely. Please Try again later.");
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/thank-you.html",
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");
  if (!messageContainer) return;
  
  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

function setLoading(isLoading) {
  const submitBtn = document.querySelector("#submit-btn");
  const spinner = document.querySelector("#spinner");
  const btnText = document.querySelector("#button-text");
  
  if (!submitBtn || !spinner || !btnText) return;

  if (isLoading) {
    submitBtn.disabled = true;
    spinner.style.display = "block";
    btnText.style.display = "none";
  } else {
    submitBtn.disabled = false;
    spinner.style.display = "none";
    btnText.style.display = "block";
  }
}

function showError(msg) {
  const propName = document.getElementById('prop-name');
  const propDesc = document.getElementById('prop-desc');
  const acceptLink = document.getElementById('accept-link');
  
  if (propName) propName.textContent = 'Error loading proposal';
  if (propDesc) propDesc.textContent = msg;
  if (acceptLink) acceptLink.style.display = 'none';
}
