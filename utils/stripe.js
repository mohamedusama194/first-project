import Stripe from "stripe";
const stripe = new Stripe(process.env.PAYMENT_API_KEY);
export default stripe;
