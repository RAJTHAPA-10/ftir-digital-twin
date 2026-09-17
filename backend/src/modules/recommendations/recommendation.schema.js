export class RecommendationValidationError extends Error {
  constructor(errors) {
    super("Recommendation request validation failed.");
    this.name = "RecommendationValidationError";
    this.errors = errors;
  }
}

export const validateRecommendationRequest = (payload) => {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    throw new RecommendationValidationError(["Request body must be a JSON object."]);
  }

  const { impactId } = payload;

  if (typeof impactId !== "string" || impactId.trim() === "") {
    errors.push("impactId must be a non-empty string.");
  }

  if (errors.length > 0) {
    throw new RecommendationValidationError(errors);
  }

  return { impactId: impactId.trim() };
};