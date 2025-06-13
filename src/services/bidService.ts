const bids: Map<number, Map<number, number>> = new Map();

export function placeBid(itemId: number, userId: number, bidAmount: number): boolean {
    if (!bids.has(itemId)) {
        bids.set(itemId, new Map());
    }
    
    const itemBids = bids.get(itemId)!;
    const currentBid = itemBids.get(userId) || 0;
    
    if (bidAmount > currentBid) {
        itemBids.set(userId, bidAmount);
        return true;
    }
    
    return false;
}

export function getTopBids(itemId: number): Array<{ userId: number, bid: number }> {
    const itemBids = bids.get(itemId);
    if (!itemBids) {
        return [];
    }

    const bidArray = Array.from(itemBids.entries())
        .map(([userId, bid]) => ({ userId, bid }))
        .sort((a, b) => b.bid - a.bid);
        
    return bidArray.slice(0, 15);
}