import mongoose, { Schema, Document } from "mongoose";
import z from "zod";

export interface IEvent extends Document {
  eventId: string;

  sessionId: string;

  eventType: string;

  pageUrl: string;

  timestamp: Date;

  clickData?: {
    x: number;
    y: number;
  };

  customData?: Record<string, any>;

  metadata?: {
    screenWidth: number;
    screenHeight: number;
    viewportWidth: number;
    viewportHeight: number;
    userAgent: string;
  };
}

const EventSchema = new Schema<IEvent>(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    eventType: {
      type: String,
      required: true,
      index: true,
    },

    pageUrl: {
      type: String,
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },

    clickData: {
      x: Number,
      y: Number,
    },

    customData: {
      type: Map,
      of: Schema.Types.Mixed,
    },

    metadata: {
      screenWidth: Number,

      screenHeight: Number,

      viewportWidth: Number,

      viewportHeight: Number,

      userAgent: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEvent>("Event", EventSchema);
