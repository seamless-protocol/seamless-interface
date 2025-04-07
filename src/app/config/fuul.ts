import { Fuul } from "@fuul/sdk";

// Fuul.getRewardDetails({
//   type: "incentive",
//   projectId: "PROJECT_ID",
//   conversion_external_id: "CONVERSION_EXTERNAL_ID",
// });

const apiKey = import.meta.env.VITE_FULL_API_KEY;
const user_address = "0x559458Aac63528fB18893d797FF223dF4D5fa3C9";

const project_id = "3cddbe7a-cd0b-445b-aebc-e3d9d075d0a7";

export const TestFuul = async () => {
  Fuul.init({ apiKey });

  const getConversions = await Fuul.getConversions({});

  try {
    const getPointsLeaderboard = await Fuul.getPointsLeaderboard({});

    console.log({ getPointsLeaderboard });
  } catch (error) {
    console.error(error);
  }
  try {
    const getPayoutsLeaderboard = await Fuul.getPayoutsLeaderboard({});

    console.log({ getPayoutsLeaderboard });
  } catch (error) {
    console.error(error);
  }

  try {
    const getUserPointsByConversion = await Fuul.getUserPointsByConversion({
      user_address,
      from: new Date("2025-01-01"),
      to: new Date(),
    });
    console.log({ getUserPointsByConversion });
  } catch (error) {
    console.error(error);
  }

  try {
    const getUserAffiliates = await Fuul.getUserAffiliates({
      user_address,
    });
    console.log({ getUserAffiliates });
  } catch (error) {
    console.error(error);
  }
};
