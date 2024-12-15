import Cart from "../models/order/cartModel.js";
import Order from "../models/order/orderModel.js";
import Address from "../models/payment/addressModel.js";

export const createOrder = async (req, res) => {
    const user = req.user;
    const { shippingAddress } = req.body;
    
    try {
        let address;

        if (shippingAddress._id) {
            // Use existing address if _id is provided
            address = await Address.findById(shippingAddress._id);
            if (!address) {
                return res.status(404).send("Address not found");
            }
        } else {
            // Create new address if _id is not provided
            address = new Address({
                user: user._id,
                firstName: shippingAddress.firstName,
                lastName: shippingAddress.lastName,
                mobile: shippingAddress.mobile,
                streetAddress: shippingAddress.streetAddress,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode
            });

            await address.save();
            // Associate address with user
            user.addresses.push(address._id);
            await user.save();
        }

        // Fetch user's cart
        const cart = await Cart.findOne({ userId: user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).send("Cart is empty");
        }

        // Prepare order items from cart items
        const orderItems = cart.items.map(item => ({
            book: item.book,
            quantity: item.quantity
        }));

        // Create the order
        const order = new Order({
            orderUser: user._id,
            shippingAddress: address,
            orderItems: orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountPrice: cart.totalDiscountPrice,
            discount: cart.discount,
            totalItems: cart.items.length,
            orderTotal: cart.totalDiscountPrice + 20,
        });

        // Empty the cart
        cart.items = [];
        cart.totalPrice = 0;
        cart.totalDiscountPrice = 0;
        cart.discount = 0;
        await cart.save();

        // Save the order
        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const placeOrder = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";
    await order.save();
    res.status(200).json(order);
}

export const confirmedOrder = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "CONFIRMED";
    await order.save();
    res.status(200).json(order);
}

export const shipOrder = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "SHIPPED";
    await order.save();
    res.status(200).json(order);
}

export const deliverOrder = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "DELIVERED";
    await order.save();
    res.status(200).json(order);
}

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = "CANCELLED";
    await order.save();
    res.status(200).json(order);
}

export const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId)
        .populate("orderUser")
        .populate("orderItems.book")
        .populate("shippingAddress");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderItems = async (req, res) => {
    const { orderId } = req.params;
    try {
        const items = await Order.findOne({orderId}).populate("orderItems.book");
        res.status(200).send(items);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

export const getOrderHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({orderUser: userId, orderStatus: "PLACED" })
        .populate("orderUser")
        .populate("orderItems.book")
        .populate("shippingAddress");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("orderUser")
        .populate("orderItems.book")
        .populate("shippingAddress");
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const deletedOrder = await Order.deleteOne({ _id: orderId });
        if (!deletedOrder) {
            throw new Error("Order cannot be deleted.");
        }
        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await Order.find({ orderStatus: status })
        .populate("orderUser")
        .populate("orderItems.book")
        .populate("shippingAddress");
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const user = req.user;
        //const { userId } = req.params;
        const orders = await Order.find({ orderUser: user._id })
        .populate("orderUser")
        .populate("orderItems.book")
        .populate("shippingAddress");
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserShippingAddresses = async (req, res) => {
    try {
        const user = req.user;
        const addresses = await Address.find({ user: user._id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// export const updateOrder = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }
//         order.status = req.body.status;
//         await order.save();
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




