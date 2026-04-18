// This is your test publishable API key.
// TODO: Replace with your actual Stripe Publishable Key when ready.
const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

let elements;

// Initialize checkout on page load
initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // $500.00 = 50000 in cents
      body: JSON.stringify({ amount: 50000 }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const { clientSecret } = await response.json();

    const appearance = {
      theme: 'night',
      variables: {
        fontFamily: '"Inter", "DM Sans", "Playfair Display", -apple-system, blinkmacsystemfont, sans-serif',
        colorPrimary: '#10b981', // Emerald green to match their branding maybe?
        colorBackground: '#1a1a1a',
        colorText: '#ffffff',
        colorDanger: '#df1b41',
        spacingUnit: '4px',
        borderRadius: '4px',
      }
    };
    
    elements = stripe.elements({ clientSecret, appearance });

    // The Payment Element handles card inputs, Google/Apple Pay, and BNPL like Afterpay/Klarna
    const paymentElementOptions = {
      layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
  } catch (error) {
    console.error("Initialization Failed:", error);
    showMessage("Failed to initialize checkout. Please Try again later.");
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  // Confirm payment with Stripe.js
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: window.location.origin + "/thank-you.html",
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
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

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit-btn").disabled = true;
    document.querySelector("#spinner").style.display = "block";
    document.querySelector("#button-text").style.display = "none";
  } else {
    document.querySelector("#submit-btn").disabled = false;
    document.querySelector("#spinner").style.display = "none";
    document.querySelector("#button-text").style.display = "block";
  }
}
