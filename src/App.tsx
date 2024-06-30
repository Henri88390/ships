import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import Ships from "./Ships";
import { GetShipsQuery, Ship } from "./gql/graphql";
const GET_SHIPS = gql(`
   query GetShips($offset: Int, $limit: Int) {
   ships (offset: $offset, limit: $limit, order: "name"){
    id
    model
    name
    type
    status
    image
  }
  } 
  `);
function App() {
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isFetchmoreLoading, setIsFetchmoreLoading] = useState(false);
  const { loading, data, fetchMore } = useQuery<GetShipsQuery>(GET_SHIPS, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const isLoading = loading || isFetchmoreLoading;
  return (
    <Ships
      isLimitReached={isLimitReached}
      entries={(data?.ships as Ship[]) || []}
      loading={isLoading}
      onLoadMore={async () => {
        setIsFetchmoreLoading(true);
        await fetchMore({ variables: { offset: data?.ships?.length } }).then(
          (result) => {
            if (result.data.ships?.length === 0) {
              setIsLimitReached(true);
            }
            setIsFetchmoreLoading(false);
          }
        );
      }}
    />
  );
}

export default App;
