import { Request, Response } from 'express';
import { isValidSession, getUserFromSession } from '../services/sessionService';
import { placeBid, getTopBids } from '../services/bidService';

export function submitBid(req: Request, res: Response) {
    const sessionKey = req.query.sessionKey as string;
    const itemId = parseInt(req.params.itemId);

    let bidAmount: number;
    if (Buffer.isBuffer(req.body)) {
        bidAmount = parseFloat(req.body.toString());
    } else {
        bidAmount = parseFloat(req.body);
    }

    if (!sessionKey || !isValidSession(sessionKey)) {
        return res.status(401).send('Invalid or expired session');
    }

    if (isNaN(itemId) || itemId < 0 || itemId > 2147483647) {
        return res.status(400).send('Invalid item ID');
    }

    if (isNaN(bidAmount) || bidAmount <= 0) {
        return res.status(400).send('Invalid bid amount');
    }

    const userId = getUserFromSession(sessionKey);
    if (!userId) {
        return res.status(401).send('Invalid session');
    }

    placeBid(itemId, userId, bidAmount);
    res.status(200).send();
}

export function getItemTopBids(req: Request, res: Response) {
    const itemId = parseInt(req.params.itemId);

    if (isNaN(itemId) || itemId < 0 || itemId > 2147483647) {
        return res.status(400).send('Invalid item ID');
    }

    const topBids = getTopBids(itemId);
    
    const response = topBids.map(bid => ({
        [bid.userId.toString()]: bid.bid.toString()
    }));

    res.json(response);
}