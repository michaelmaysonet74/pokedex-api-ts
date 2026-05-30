import { MeasurementsRecord } from "../db/schema";

export const buildMeasurement = (measurement?: MeasurementsRecord | null) =>
  measurement
    ? {
        height: measurement.height,
        weight: measurement.weight,
      }
    : null;
