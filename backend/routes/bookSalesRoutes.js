import express from 'express';
import {
    createBookSale,
    getBookSales,
    getBookSaleById,
    updateBookSale,
    deleteBookSale,
    getSalesStats,
    getTotalRevenue
} from '../controllers/bookSalesController.js';

const router = express.Router();

router.post('/', createBookSale);
router.get('/', getBookSales);
router.get('/stats', getSalesStats);
router.get('/revenue', getTotalRevenue);
router.get('/:id', getBookSaleById);
router.put('/:id', updateBookSale);
router.delete('/:id', deleteBookSale);

export default router;
