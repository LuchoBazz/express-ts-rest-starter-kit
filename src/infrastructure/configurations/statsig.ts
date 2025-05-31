import { StatsigUser } from "@statsig/client-core";
import { StatsigClient, StatsigOptions } from "@statsig/js-client";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";

const user: StatsigUser = { userID: "HERE_YOUR_CLIENT_ID" };

const options: StatsigOptions = {
  plugins: [new StatsigSessionReplayPlugin(), new StatsigAutoCapturePlugin()],
  environment: { tier: "staging" },
};

export const statsigClient = new StatsigClient("<YOUR_CLIENT_SDK_KEY>", user, options);
