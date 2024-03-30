export interface UpdateFeatureFlagInput {
  id: string;
  clientId: string;
  key?: string;
  percentage?: number;
  isExperimental?: boolean;
  isActive?: boolean;
}

export interface FeatureFlagSearchCriteriaInput {
  id: string;
  clientId: string;
}