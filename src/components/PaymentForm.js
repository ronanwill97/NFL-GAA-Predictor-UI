// Import necessary components from Stripe
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';

// Load your publishable key
const stripePromise = loadStripe(process.env.STRIPE_API_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            const {id} = paymentMethod;
            const response = axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `gaa-nfl-predictions.azurewebsites.net/payment`,
                body: JSON.stringify({payment_method_id: id}),
            });
            // Handle the response from your backend
            const paymentIntentResponse = await response.data;
            console.log(paymentIntentResponse)
            // Further actions based on your application logic

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const App = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
    );
};

export default App;
