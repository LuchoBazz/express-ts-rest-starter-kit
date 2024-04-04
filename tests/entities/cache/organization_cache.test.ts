import { OrganizationCacheParameters } from "../../../src/entities/cache/organization_cache.entity";

describe("Given a OrganizationCacheParameters instance", () => {
  const clientId = "exampleClientId";
  const paramKey = "exampleParamKey";
  const cacheParameters = new OrganizationCacheParameters(clientId, paramKey);

  it("should generates correct key", () => {
    const key = cacheParameters.generateKey();
    expect(key).toBe(`${clientId}-${paramKey}`);
  });

  it("should returns correct search values", () => {
    const searchValues = cacheParameters.getSearchValues();
    expect(searchValues).toEqual([clientId, paramKey]);
  });

  it("should returns correct client ID", () => {
    const returnedClientId = cacheParameters.getClientId();
    expect(returnedClientId).toBe(clientId);
  });

  it("should returns correct param key", () => {
    const returnedParamKey = cacheParameters.getParamKey();
    expect(returnedParamKey).toBe(paramKey);
  });
});
