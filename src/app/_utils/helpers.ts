export function convertWindSpeedToKmh(windSpeedInMps: number): number {
  const windSpeedInKmh = windSpeedInMps * 3.6; // Conversion factor: 1 m/s = 3.6 km/h
  return parseFloat(windSpeedInKmh.toFixed(2)); //
}
