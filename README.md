# InsightFlow

A lightweight full-stack user analytics platform inspired by Google Analytics.

InsightFlow consists of:

* Analytics Tracker SDK
* Analytics Ingestion API
* Analytics Dashboard
* Demo E-Commerce Store

The platform captures user behavior in real time, stores events, and visualizes them through a modern analytics dashboard.

---

## Features

### Tracker SDK

* Session tracking
* Page view tracking
* Click tracking
* Custom event tracking
* Automatic batching
* Retry with exponential backoff
* Persistent offline queue
* SPA route change detection
* Debug mode

### Backend API

* Bulk event ingestion
* Session analytics
* User journey reconstruction
* Heatmap data generation
* Product analytics
* Funnel analytics
* Top events analytics
* Page analytics
* Swagger API documentation
* Rate limiting
* Request validation
* Structured logging

### Dashboard

* KPI overview cards
* Session explorer
* Session journey timeline
* Product analytics
* Conversion funnel
* Top events
* Page analytics
* Heatmap visualization
* Pagination
* Search
* Sorting
* CSV export
* Loading states
* Error states

### Demo Store

* Product browsing
* Wishlist tracking
* Add to cart tracking
* Purchase tracking
* Search tracking
* Analytics SDK integration

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Recharts
* Zustand

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Zod
* Pino

### Testing

* Jest
* Supertest
* MongoDB Memory Server

---

## Architecture

┌─────────────────┐
│ Demo Store      │
└───────┬─────────┘
│
▼
┌─────────────────┐
│ Tracker SDK     │
└───────┬─────────┘
│
▼
┌─────────────────┐
│ Ingestion API   │
└───────┬─────────┘
│
▼
┌─────────────────┐
│ MongoDB         │
└───────┬─────────┘
│
▼
┌─────────────────┐
│ Dashboard       │
└─────────────────┘

---

## Project Structure

```text
insightflow/

├── backend/
│   ├── src/
│   ├── tests/
│   └── docs/

├── tracker-sdk/
│   ├── src/
│   └── dist/

├── dashboard/
│   ├── app/
│   ├── components/
│   └── lib/

└── demo-store/
```

---

## Installation

### Clone

```bash
git clone <repository-url>
cd insightflow
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

Server:

```text
http://localhost:5000
```

Swagger:

```text
http://localhost:5000/api-docs
```

---

### Tracker SDK

```bash
cd tracker-sdk

npm install

npm run build
```

---

### Dashboard

```bash
cd dashboard

npm install

npm run dev
```

Dashboard:

```text
http://localhost:3000
```

---

### Demo Store

```bash
cd demo-store

npm install

npm run dev
```

Store:

```text
http://localhost:3000
```

---

## Environment Variables

### Backend

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/insightflow

NODE_ENV=development
```

---

## Example SDK Usage

```ts
import { InsightFlow }
from "@insightflow/sdk";

const analytics =
  new InsightFlow({
    apiUrl:
      "http://localhost:5000/api/events/bulk",

    debug: true,
  });

analytics.init();

analytics.track(
  "purchase_completed",
  {
    orderId: "123",
    total: 299,
  },
);
```

---

## API Endpoints

### Events

```http
POST /api/events/bulk
```

### Analytics

```http
GET /api/analytics/overview

GET /api/analytics/sessions

GET /api/analytics/pages

GET /api/analytics/heatmap
```

### Sessions

```http
GET /api/sessions/:sessionId
```

---

## Testing

Run all tests:

```bash
npm run test
```

Coverage:

```bash
npm run test -- --coverage
```

---

## Engineering Decisions

### Event Batching

Events are batched before being sent to reduce network requests.

### Retry Strategy

Failed requests use exponential backoff retries.

### Persistent Queue

Pending events are stored in localStorage and restored on reload.

### Aggregation-Based Analytics

Analytics endpoints use MongoDB aggregation pipelines to efficiently compute metrics.

### Session Reconstruction

User journeys are reconstructed from stored event streams ordered by timestamp.

---

## Future Improvements

* Real-time analytics
* Live dashboard updates
* User segmentation
* Cohort analysis
* Retention analytics
* Revenue analytics
* Advanced funnel analysis

---

## License

MIT