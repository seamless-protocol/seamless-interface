import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

const fetchIsAddressSanctioned = async ({
  queryKey,
}: {
  queryKey: string[];
}) => {
  const address = queryKey[1];
  console.log("address", address);

  try {
    const res = await fetch(
      "https://api.trmlabs.com/public/v1/sanctions/screening",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            address,
          },
        ]),
      }
    );

    if (!res.ok) {
      console.error("Failed to check if address is sanctioned");
    }

    const data: [{ isSanctioned: boolean }] = await res.json();
    return data[0].isSanctioned;
  } catch (e) {
    console.error(" Failed to check if address is sanctioned");
    return false;
  }
};

export const useFetchIsAddressSanctioned = (address: Address) => {
  const { data } = useQuery({
    queryKey: ["fetchIsAddressSanctioned", address],
    queryFn: fetchIsAddressSanctioned,
  });

  return { isSanctioned: data };
};
