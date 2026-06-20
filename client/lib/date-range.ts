export function resolveRange(
  range?: string,
) {
  const endDate =
    new Date();

  const startDate =
    new Date();

  switch (range) {
    case "30d":
      startDate.setDate(
        endDate.getDate() - 30,
      );
      break;

    case "90d":
      startDate.setDate(
        endDate.getDate() - 90,
      );
      break;

    default:
      startDate.setDate(
        endDate.getDate() - 7,
      );
  }

  return {
    startDate:
      startDate.toISOString(),

    endDate:
      endDate.toISOString(),
  };
}