import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";

import { CacheParameters } from "../../entities/cache/organization_cache.entity";

export class CacheService {
  private readonly cache: NodeCache;

  public constructor() {
    const ttlSeconds = 3600;
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  public async get<T>(
    parameters: CacheParameters,
    client: PrismaClient,
    searcher?: (client: PrismaClient, params: string[]) => Promise<T | null>,
  ): Promise<T | null> {
    const key = parameters.generateKey();
    const value = this.cache.get<T>(key) ?? null;

    if (value || !searcher) {
      return value;
    }
    try {
      const newValue = await searcher(client, parameters.getSearchValues());
      this.cache.set(key, newValue);
      return newValue;
    } catch (error) {
      return null;
    }
  }

  public delete(keys: NodeCache.Key[]) {
    this.cache.del(keys);
  }
}
