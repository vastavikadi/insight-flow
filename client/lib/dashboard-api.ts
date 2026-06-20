const API_URL =
  "http://localhost:5000/api";

export async function getSessions(
  page = 1,
  limit = 20,
) {
  const res =
    await fetch(
      `${API_URL}/analytics/sessions?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch sessions",
    );
  }

  return res.json();
}

export async function getSessionJourney(
  sessionId: string,
) {
  const response =
    await fetch(
      `${API_BASE}/sessions/${sessionId}`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch session journey",
    );
  }

  return response.json();
}

export async function getHeatmap(
  pageUrl: string,
) {
  const res =
    await fetch(
      `${API_URL}/analytics/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`,
      {
        cache: "no-store",
      },
    );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch heatmap",
    );
  }

  return res.json();
}

export async function getOverview() {
  const res =
    await fetch(
      `${API_URL}/analytics/overview`,
      {
        cache: "no-store",
      },
    );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch overview",
    );
  }

  return res.json();
}

export async function getPages() {
  const res =
    await fetch(
      `${API_URL}/analytics/pages`,
      {
        cache: "no-store",
      },
    );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch pages",
    );
  }

  return res.json();
}

export async function getEventDistribution() {
  const response =
    await fetch(
      `${API_BASE}/analytics/events`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch event analytics",
    );
  }

  return response.json();
}

export async function getFunnel() {
  const response =
    await fetch(
      `${API_BASE}/analytics/funnel`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch funnel",
    );
  }

  return response.json();
}

export async function getTimeline(
  days = 7,
) {
  const response =
    await fetch(
      `${API_BASE}/analytics/timeline?days=${days}`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch timeline",
    );
  }

  return response.json();
}

export async function getProductsAnalytics() {
  const response =
    await fetch(
      `${API_BASE}/analytics/products`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products analytics",
    );
  }

  return response.json();
}

export async function getTopEvents() {
  const response =
    await fetch(
      `${API_BASE}/analytics/top-events`,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch top events",
    );
  }

  return response.json();
}