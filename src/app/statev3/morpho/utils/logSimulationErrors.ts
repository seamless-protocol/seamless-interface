export function logSimulationErrors(obj: any, path = ""): void {
  for (const key in obj) {
    // Ensure we are only working with the object's own properties
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const currentPath = path ? `${path}.${key}` : key;

    if (value === null) continue;

    if (typeof value === "object" && value !== null) {
      logSimulationErrors(value, currentPath);
    } else {
      console.error(`Error found at: ${currentPath}`);
    }
  }
}
