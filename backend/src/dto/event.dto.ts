export class EventDTO {
  static toResponse(
    event: any
  ) {
    return {
      id: event._id,

      eventId:
        event.eventId,

      eventType:
        event.eventType,

      pageUrl:
        event.pageUrl,

      timestamp:
        event.timestamp,

      clickData:
        event.clickData,
    };
  }
}