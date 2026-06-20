const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getSessions(
  page = 1,
  limit = 20,
  query: {
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = {},
  startDate?: string,
  endDate?: string,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(query.search && { search: query.search }),
    ...(query.sortBy && { sortBy: query.sortBy }),
    ...(query.sortOrder && { sortOrder: query.sortOrder }),
  });

  const dateParams = new URLSearchParams();

  if (startDate) {
    dateParams.append("startDate", startDate);
  }

  if (endDate) {
    dateParams.append("endDate", endDate);
  }
  try {
    const res = await fetch(
      `${API_URL}/analytics/sessions?${params.toString()}&${dateParams.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Sessions request failed (${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
}

export async function getSessionJourney(sessionId: string) {
  try {
    const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Session journey request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching session journey:", error);
    throw error;
  }
}

export async function getHeatmap(
  pageUrl: string,
  startDate?: string,
  endDate?: string,
) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const res = await fetch(
      `${API_URL}/analytics/heatmap?pageUrl=${encodeURIComponent(pageUrl)}&${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Heatmap request failed (${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    throw error;
  }
}

export async function getOverview(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const res = await fetch(
      `${API_URL}/analytics/overview?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Overview request failed (${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching overview data:", error);
    throw error;
  }
}

export async function getPages(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const res = await fetch(`${API_URL}/analytics/pages?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Pages request failed (${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching pages data:", error);
    throw error;
  }
}

export async function getEventDistribution(
  startDate?: string,
  endDate?: string,
) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const response = await fetch(
      `${API_URL}/analytics/events?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Event distribution request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching event distribution data:", error);
    throw error;
  }
}

export async function getFunnel(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }

  try {
    const response = await fetch(
      `${API_URL}/analytics/funnel?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Funnel request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching funnel data:", error);
    throw error;
  }
}

export async function getTimeline(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }

  try {
    const response = await fetch(
      `${API_URL}/analytics/timeline?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Timeline request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching timeline data:", error);
    throw error;
  }
}

export async function getProductsAnalytics(
  startDate?: string,
  endDate?: string,
) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const response = await fetch(
      `${API_URL}/analytics/products?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Products analytics request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products analytics data:", error);
    throw error;
  }
}

export async function getTopEvents(startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }
  try {
    const response = await fetch(
      `${API_URL}/analytics/top-events?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Top events request failed (${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching top events data:", error);
    throw error;
  }
}

export async function exportSessions() {
  try {
    const response = await fetch(`${API_URL}/analytics/export-sessions`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Export sessions request failed (${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error("Error exporting sessions:", error);
    throw error;
  }
}
