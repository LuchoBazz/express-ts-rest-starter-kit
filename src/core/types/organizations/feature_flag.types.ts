export interface UpdateFeatureFlagInput {
  key: string;
  clientId: string;
  percentage?: number;
  isExperimental?: boolean;
  isActive?: boolean;
}

export interface FeatureFlagSearchCriteriaInput {
  key: string;
  clientId: string;
  email?: string;
}
