import request from 'supertest';
import express from 'express';
import { submitBid, getItemTopBids } from '../../controllers/bidController';

const app = express();
app.use(express.json());
app.use(express.raw({ type: '*/*' }));

jest.mock('../../services/sessionService');
jest.mock('../../services/bidService');

describe('BidController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('submitBid should reject invalid item ID', async () => {
        const { isValidSession } = require('../../services/sessionService');
        isValidSession.mockReturnValue(true);
        
        app.post('/:itemId/bid', submitBid);
        
        const response = await request(app)
            .post('/abc/bid?sessionKey=valid')
            .send({ amount: 25.5 });
            
        expect(response.status).toBe(400);
    });

    test('getItemTopBids should return formatted response', async () => {
        const { getTopBids } = require('../../services/bidService');
        getTopBids.mockReturnValue([
            { userId: 123, bid: 25.5 },
            { userId: 456, bid: 20.0 }
        ]);
        
        app.get('/:itemId/bid', getItemTopBids);
        
        const response = await request(app)
            .get('/1/bid');
            
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { "123": "25.5" },
            { "456": "20" }
        ]);
    });
});