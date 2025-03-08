export const checkMorphoResponse = (result: any) => {
  if (result.errors) {
    throw new Error(`Failed to fetch MorphoApi data: ${result.errors.map((e: any) => e.message).join("; ")}`);
  } else if (result.error) {
    throw new Error(`Failed to fetch MorphoApi data: ${result.error.message}`);
  }
};
