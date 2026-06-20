export function buildDateFilter(
  startDate?: string,
  endDate?: string,
) {
  if (!startDate && !endDate) {
    return {};
  }

  const filter: Record<string, Date> = {};

  if (startDate) {
    filter.$gte = new Date(startDate);
  }

  if (endDate) {
    filter.$lte = new Date(endDate);
  }

  return {
    timestamp: filter,
  };
}