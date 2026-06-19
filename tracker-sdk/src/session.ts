import { STORAGE_KEYS }
from "./constants";

export class SessionManager {

  private sessionId: string;

  constructor() {

    this.sessionId =
      this.loadOrCreateSession();
  }

  private loadOrCreateSession(): string {

    const existing =
      localStorage.getItem(
        STORAGE_KEYS.SESSION_ID
      );

    if (existing) {
      return existing;
    }

    const sessionId =
      crypto.randomUUID();

    localStorage.setItem(
      STORAGE_KEYS.SESSION_ID,
      sessionId
    );

    return sessionId;
  }

  public getSessionId() {
    return this.sessionId;
  }

  public resetSession() {

    const sessionId =
      crypto.randomUUID();

    localStorage.setItem(
      STORAGE_KEYS.SESSION_ID,
      sessionId
    );

    this.sessionId =
      sessionId;

    return sessionId;
  }
}