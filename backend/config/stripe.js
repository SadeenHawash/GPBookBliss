import Stripe from 'stripe';

const secertKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51PVLnELXhjHqScDnFM23ZjUsTEoIMvNSBlF9YDH9gMM6AjXDFukpYZiSGaJcLd6HjOQEJE4ooiJh068GGnqeGeHw00GfYw5hsY';
const stripe = new Stripe(secertKey);

export default stripe;