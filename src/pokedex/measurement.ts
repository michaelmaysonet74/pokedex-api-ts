import { MeasurementsRecord } from "../db/schema";

export const buildMeasurement = (measurement: MeasurementsRecord) => ({
  height: measurement.height,
  weight: measurement.weight,
});
