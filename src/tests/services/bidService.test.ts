import { placeBid, getTopBids } from '../../services/bidService';

describe('BidService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('placeBid should store bid correctly', () => {
        placeBid(1, 100, 25.5);
        
        const topBids = getTopBids(1);
        expect(topBids).toEqual([{ userId: 100, bid: 25.5 }]);
    });

    test('placeBid should not update with lower bid', () => {
        placeBid(1, 100, 30);
        placeBid(1, 100, 25.5);
        
        const topBids = getTopBids(1);
        expect(topBids).toEqual([{ userId: 100, bid: 30 }]);
    });

    test('getTopBids should return empty array for unknown item', () => {
        const topBids = getTopBids(999);
        expect(topBids).toEqual([]);
    });

    test('getTopBids should sort by bid amount descending', () => {
        placeBid(2, 100, 25.5);
        placeBid(2, 200, 30.0);   
        placeBid(2, 300, 20.0);   
        
        const topBids = getTopBids(2);
        expect(topBids).toEqual([
            { userId: 200, bid: 30.0 },
            { userId: 100, bid: 25.5 },
            { userId: 300, bid: 20.0 }
        ]);
    });
});