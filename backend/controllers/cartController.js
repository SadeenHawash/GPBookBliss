import Cart from "../models/order/cartModel.js";
import Book from "../models/bookModel.js";

const calculateCartTotals = async (cart) => {
    let totalPrice = 0;
    let totalDiscountPrice = 0;

    // Iterate through cart items
    for (const item of cart.items) {
        // Ensure the book object is populated correctly
        const populatedItem = await Cart.populate(item, { path: 'book' });
        const itemPrice = populatedItem.book.price || 0;
        const itemQuantity = populatedItem.quantity;

        // Calculate subtotal for the item
        const itemSubtotal = itemPrice * itemQuantity;

        // Calculate item discount
        const itemDiscount = populatedItem.book.discount || 0;
        const itemDiscountAmount = (itemDiscount / 100) * itemSubtotal;

        // Add to total price and discount price
        totalPrice += itemSubtotal;
        totalDiscountPrice += itemSubtotal - itemDiscountAmount;
    }

    // Update cart totals
    cart.discount = totalPrice - totalDiscountPrice;
    cart.totalPrice = totalPrice;
    cart.totalDiscountPrice = totalDiscountPrice;

    return cart;
};

// Add item to cart
export const addToCart = async (req, res) => {
    const userId = req.user._id;
    const bookId = req.params.bookId;
    const { quantity } = req.body;

    try {
        // Find the book and check availability
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }

        if (book.quantity < quantity) {
            return res.status(400).send("Not enough stock available");
        }

        // Check if there's an existing cart for the user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Cart exists, check if item is already in cart
            const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

            if (itemIndex !== -1) {
                // Item exists, update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Item doesn't exist, add new item to cart
                cart.items.push({ book: bookId, quantity });
            }

            // Calculate cart totals
            cart = await calculateCartTotals(cart);
            await cart.save();

            return res.status(201).send(cart);
        } else {
            // No cart exists, create a new cart
            const newCart = await Cart.create({
                userId,
                items: [{ book: bookId, quantity }],
            });

            // Populate book details in cart items
            await newCart.populate('items.book').execPopulate();

            // Calculate cart totals
            await calculateCartTotals(newCart);
            await newCart.save();

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

export const updateCartItem = async (req, res) => {
    const userId = req.user._id;
    const bookId = req.params.bookId;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
        return res.status(404).send("Cart not found");
        }

        const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
        );
        if (itemIndex === -1) {
        return res.status(404).send("Item not found in cart");
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to update cart item");
    }
};

export const incrementItem = async (req, res) => {
    const userId = req.user._id;
    const itemId = req.params.itemId;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).send("Item not found in cart");
        }

        item.quantity += 1;

        await calculateCartTotals(cart);
        await cart.save();

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to increment item quantity' });
    }
};

export const decrementItem = async (req, res) => {
    const userId = req.user._id;
    const itemId = req.params.itemId;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).send("Item not found in cart");
        }

        item.quantity -= 1;

        await calculateCartTotals(cart);
        await cart.save();

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to increment item quantity' });
    }
};

// Get cart for user
export const getCart = async (req, res) => {
    console.log("User ID:", req.user._id); // Check if userId is correctly populated
    const userId = req.user._id;
    try {
        let cart = await Cart.findOne({ userId }).populate("items.book");
        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        res.status(200).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    const userId = req.user._id;
    const itemId = req.params.itemId;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        // Find the index of the item to be removed
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex > -1) {
            // Remove the item from the array
            cart.items.splice(itemIndex, 1);

            await calculateCartTotals(cart);
            await cart.save(); // Save the updated cart

            return res.status(200).send(cart); // Return the updated cart
        } else {
            return res.status(404).send("Item not found in cart");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

export const emptyCart = async (req, res) => {
    const userId = req.user._id;
    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        // Empty the cart items
        cart.items = [];
        cart.totalPrice = 0;
        cart.totalDiscountPrice = 0;
        cart.discount = 0;
        cart = await cart.save();

        return res.status(200).send(cart);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};
