export function getPagination(page?: string, limit?: string) {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Number(limit) || 20, 100);
  return {
    page: currentPage,
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  };
}
