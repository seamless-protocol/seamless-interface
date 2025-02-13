import { Fuul } from "@fuul/sdk";

Fuul.init({ apiKey: import.meta.env.VITE_BASE_RPC_FREE_1 });

// Fuul.getRewardDetails({
//   type: "incentive",
//   projectId: "PROJECT_ID",
//   conversion_external_id: "CONVERSION_EXTERNAL_ID",
// });

export const TestFuul = async () => {
  const a1 = await Fuul.getPayoutsLeaderboard({ currency_address: "0x12345" });
  console.log(a1);

  const a2 = await await Fuul.getPointsLeaderboard({
    user_address: "0x12345",
    from: new Date("2021-01-01"),
    to: new Date("2022-01-01"),
    // user_type: '', // all, affiliate or end_user
    conversions: "1,2,3",
  });

  console.log({ a2 });

  const a3 = await Fuul.getUserPointsByConversion({
    user_address: "0x12345",
    from: new Date("2021-01-01"),
    to: new Date("2026-01-01"),
  });
  console.log(a3);
};
