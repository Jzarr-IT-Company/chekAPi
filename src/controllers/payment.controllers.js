import Stripe from "stripe";
const stripe = Stripe("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");

// const payment = async (req, res) => {
//     const { amount } = req.body;
//     console.log(amount)
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'pkr',
//         });

//         res.json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// / Define the fixed amount (e.g., 2000 PKR)
const FIXED_AMOUNT_IN_PKR = 2000;
const FIXED_AMOUNT_IN_PAISA = FIXED_AMOUNT_IN_PKR * 100; // Convert to paisa

const payment = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: FIXED_AMOUNT_IN_PAISA, // Fixed amount in paisa
            currency: 'pkr', // Pakistani Rupees
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




export default payment


