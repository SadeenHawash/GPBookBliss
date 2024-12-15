import Order from "../models/order/orderModel.js";
import stripe from "../config/stripe.js";
import Payment from "../models/payment/paymentModel.js";
import User from "../models/user/userModel.js";

export const stripePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const user = req.user;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.orderTotal * 100),
      currency: "usd",
      metadata: {
        userId: user?._id.toString(),
        userEmail: user?.email,
        orderId: orderId,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      userId: user?._id.toString(),
      userEmail: user?.email,
      orderId: orderId,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params; // Assuming paymentId is passed as a URL parameter
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (paymentIntent.status !== "success") {
      const metadata = paymentIntent?.metadata;
      const orderId = metadata?.orderId;
      const userId = metadata?.userId;
      const userEmail = metadata?.userEmail;

      const userFound = await User.findById(userId);
      if (!userFound) {
        throw new Error("User not found");
      }

      const orderFound = await Order.findById(orderId);
      if (!orderFound) {
        throw new Error("Order not found");
      }

      const amount = paymentIntent?.amount / 100;
      const currency = paymentIntent?.currency;

      // PAYMENT HISTORY
      const newPayment = await Payment.create({
        userId: userId,
        order: orderId,
        status: "success",
        amount: amount,
        currency: currency,
        refrence: paymentId,
      });
      if (newPayment) {
        orderFound.paymentDetails.paymentStatus = "Paid";
        orderFound.paymentDetails.paymentId = newPayment._id;
        await orderFound.save();
      }
      res.json({
        status: "success",
        message: "Payment verified, order updated successfully",
        paymentIntent: paymentIntent,
        orderFound,
        userFound,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
