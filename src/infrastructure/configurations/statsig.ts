import { StatsigUser } from "@statsig/client-core";
import { StatsigClient, StatsigOptions } from "@statsig/js-client";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";

const user: StatsigUser = { userID: "HERE_YOUR_CLIENT_ID" };

const options: StatsigOptions = {
  plugins: [new StatsigSessionReplayPlugin(), new StatsigAutoCapturePlugin()],
  environment: { tier: "staging" },
};

const STATSIG_SECRET_KEY = process.env.STATSIG_SECRET_KEY ?? "STATSIG_SECRET_KEY";

export const statsigClient = new StatsigClient(STATSIG_SECRET_KEY, user, options);
