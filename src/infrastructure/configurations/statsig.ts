import { Statsig, StatsigOptions } from "@statsig/statsig-node-core";

const STATSIG_SECRET_KEY = process.env.STATSIG_SECRET_KEY ?? "STATSIG_SECRET_KEY";
const STATSIG_ENVIRONMENT = process.env.STATSIG_ENVIRONMENT ?? "development";

const options: StatsigOptions = { environment: STATSIG_ENVIRONMENT };

export const statsig = new Statsig(STATSIG_SECRET_KEY, options);
