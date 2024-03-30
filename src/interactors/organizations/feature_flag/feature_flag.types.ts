export interface UpdateFeatureFlagInput {
  key: string;
  clientId: string;
  percentage?: number;
  isExperimental?: boolean;
  isActive?: boolean;
}

export interface FeatureFlagSearchCriteriaInput {
  id: string;
  clientId: string;
}
