import express from 'express';
import { login } from './controllers/authController';
import { submitBid, getItemTopBids } from './controllers/bidController';

const router = express.Router();

router.get('/:userId/login', login);
router.post('/:itemId/bid', submitBid);
router.get('/:itemId/topBidList', getItemTopBids);

router.get('/', (req, res) => {
    res.send('Bidding Backend API');
});

export default router;