export class SessionDTO {
  static toResponse(
    session: any
  ) {
    return {
      sessionId:
        session._id,

      totalEvents:
        session.totalEvents,

      firstSeen:
        session.firstSeen,

      lastSeen:
        session.lastSeen,
    };
  }
}