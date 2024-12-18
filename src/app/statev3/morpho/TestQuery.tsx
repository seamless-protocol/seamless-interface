import { useState, useEffect } from "react";

const MARKET_APYS_QUERY = `
query MarketApys($chainId: Int, $options: TimeseriesOptions) {
  test: marketByUniqueKey(
    uniqueKey: "0xdaa04f6819210b11fe4e3b65300c725c32e55755e3598671559b9ae3bac453d7",
    chainId: $chainId
  ) {
    uniqueKey
    historicalState {
      weeklyBorrowApy(options: $options) {
        x
        y
      }
    }
    lltv
  }
}
`;

export function useMarketApys() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApys = async () => {
      const chainId = 8453; // Make sure this matches what worked in the Playground
      const options = {
        startTimestamp: 1723991181,
        interval: "WEEK",
      };

      try {
        const response = await fetch("https://blue-api.morpho.org/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: MARKET_APYS_QUERY,
            variables: { chainId, options },
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors.map((e: any) => e.message).join(", "));
        }

        setData(result.data);
      } catch (err: any) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApys();
  }, []);

  return { data, loading, error };
}

export function TestQuery() {
  const { data, loading, error } = useMarketApys();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {(error as any)?.message}</div>;

  return (
    <div>
      <h1>Market APYs</h1>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
