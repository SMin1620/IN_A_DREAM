import React, { useState, useEffect } from "react";
import CircleGraph from "../CircleGraph/CircleGraph";
import useStatistic from "../../../hooks/useStatistic";

const Statics = () => {
  const { getStatics, userStatics } = useStatistic();

  useEffect(() => {
    getStatics();
  }, []);

  console.log(userStatics);
  console.log(userStatics[0]);
  console.log(userStatics[1]);
  console.log(userStatics[2]);

  return (
    <div>
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
