# Bidding Backend API

A Node.js/TypeScript HTTP-based mini bidding system that handles bid registration for users and items, with session management and top bid retrieval.

## Features

- **Session Management**: 10-minute session keys for user authentication
- **Bidding System**: Users can place bids on items
- **Top Bids**: Retrieve top 15 bids per item (descending)
- **Concurrency Safe**: Handles multiple simultaneous requests
- **Memory-based**: No disk persistence required

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Login
Get a session key valid for 10 minutes.

```
GET /<userID>/login
```

**Example:**
```bash
curl http://localhost:8081/4711/login
# Returns: ABC123XY
```

### Place Bid
Submit a bid for an item (requires valid session).

```
POST /<itemID>/bid?sessionKey=<sessionKey>
Body: <bid_amount>
```

**Example:**
```bash
curl -X POST "http://localhost:8081/2/bid?sessionKey=ABC123XY" -d "25.5"
```

### Get Top Bids
Retrieve top bids for an item (max 15, highest first).

```
GET /<itemID>/topBidList
```

**Example:**
```bash
curl http://localhost:8081/2/topBidList
# Returns: [{"4711": "25.5"}, {"1234": "20.0"}]
```

## Testing

```bash
npm test
```

## Architecture

```
src/
├── app.ts              # Main application setup
├── routes.ts            # Route definitions
├── controllers/        # Request handlers
├── services/           # Business logic
├── types/             # TypeScript interfaces
└── tests/             # Unit tests
```