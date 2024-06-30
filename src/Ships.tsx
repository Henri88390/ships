import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import styles from "./Ships.module.scss";
import { Ship } from "./gql/graphql";

type ShipsProps = {
  entries: Ship[];
  loading: boolean;
  isLimitReached: boolean;
  onLoadMore: () => void;
};
function Ships({ entries, loading, onLoadMore, isLimitReached }: ShipsProps) {
  useEffect(() => {
    const handleScroll = () => {
      console.log("hello world");
      const height1 = window.innerHeight + document.documentElement.scrollTop;
      const height2 = document.documentElement.offsetHeight;
      const errorMargin = 10;
      const areHeightEqual =
        Math.abs(height1 - height2) <= errorMargin &&
        Math.abs(height2 - height1) <= errorMargin;
      if (!areHeightEqual || loading || isLimitReached) {
        return;
      }
      onLoadMore();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isLimitReached, onLoadMore]);

  return (
    <div className={styles.container}>
      <h3>Ships</h3>
      <ul className={styles.listContainer}>
        {entries.map((ship, index) => (
          <div key={index}>
            <li key={index}>{ship.name}</li>
            <img
              width={500}
              alt={ship.name || ""}
              src={ship.image || undefined}
            />
          </div>
        ))}
      </ul>
      {loading ? (
        <div className={styles.progressContainer}>
          <CircularProgress />
        </div>
      ) : (
        isLimitReached && "No more ships to load"
      )}
    </div>
  );
}

export default Ships;
