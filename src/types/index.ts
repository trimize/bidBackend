export interface Session {
    userId: number;
    expiresAt: Date;
}

export interface BidData {
    userId: number;
    amount: number;
    timestamp: Date;
}