import React, { useState, useEffect } from "react";
import CircleGraph from "../CircleGraph/CircleGraph";
import useStatistic from "../../../hooks/useStatistic";
import "./Statics.css";

const Statics = () => {
  const { getStatics, userStatics } = useStatistic();

  useEffect(() => {
    getStatics();
  }, []);

  return (
    <div className="statistic">
      <CircleGraph
        data={[
          { name: userStatics[1]?.emotion, value: userStatics[1]?.count },
          { name: userStatics[0]?.emotion, value: userStatics[0]?.count },
          { name: userStatics[2]?.emotion, value: userStatics[2]?.count },
        ]}
      />
    </div>
  );
};

export default Statics;
