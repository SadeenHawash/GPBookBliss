import BooksSales from '../models/bookSales.js';

// Create a new book sale entry
export const createBookSale = async (req, res) => {
    const { bookId, Quantity, revenue, month, year } = req.body;

    try {
        const newBookSale = new BooksSales({ bookId, Quantity, revenue, month, year });
        const savedBookSale = await newBookSale.save();
        res.status(201).json(savedBookSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all book sales
export const getBookSales = async (req, res) => {
    try {
        const bookSales = await BooksSales.find().populate('bookId');
        res.status(200).json(bookSales);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a book sale by ID
export const getBookSaleById = async (req, res) => {
    const { id } = req.params;

    try {
        const bookSale = await BooksSales.findById(id).populate('bookId');
        if (!bookSale) {
            return res.status(404).json({ message: 'Book sale not found' });
        }
        res.status(200).json(bookSale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a book sale by ID
export const updateBookSale = async (req, res) => {
    const { id } = req.params;
    const { bookId, Quantity, revenue, month, year } = req.body;

    try {
        const updatedBookSale = await BooksSales.findByIdAndUpdate(
            id,
            { bookId, Quantity, revenue, month, year },
            { new: true }
        );

        if (!updatedBookSale) {
            return res.status(404).json({ message: 'Book sale not found' });
        }

        res.status(200).json(updatedBookSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book sale by ID
export const deleteBookSale = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBookSale = await BooksSales.findByIdAndDelete(id);
        if (!deletedBookSale) {
            return res.status(404).json({ message: 'Book sale not found' });
        }
        res.status(200).json({ message: 'Book sale deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get sales statistics for a specific month and year
export const getSalesStats = async (req, res) => {
    const { month, year } = req.query;

    try {
        const salesStats = await BooksSales.aggregate([
            { $match: { month: parseInt(month), year: parseInt(year) } },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$Quantity" },
                    totalRevenue: { $sum: "$revenue" },
                },
            },
        ]);

        res.status(200).json(salesStats[0] || { totalQuantity: 0, totalRevenue: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get total revenue, optionally filtering by month and year
export const getTotalRevenue = async (req, res) => {
    const { month, year } = req.query;
    const matchStage = {};

    if (month) {
        matchStage.month = parseInt(month);
    }
    if (year) {
        matchStage.year = parseInt(year);
    }

    try {
        const revenueStats = await BooksSales.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" },
                },
            },
        ]);

        res.status(200).json(revenueStats[0] || { totalRevenue: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

