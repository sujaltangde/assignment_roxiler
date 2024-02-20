import React from "react";

export const TransactionStatistics = ({statisticsData}) => {



  return (
    <>
      <div className="px-14 py-3 ">
        <div className="bg-yellow-300 p-5 font-semibold text-xl w-1/3 rounded-xl  flex flex-col gap-2">
          <div className="flex">
            <div className="w-2/3">Total sale </div>{" "}
            <div className="w-1/3">{statisticsData && statisticsData.totalSaleAmount ? statisticsData.totalSaleAmount : "Loading" }</div>
          </div>
          <div className="flex">
            <div className="w-2/3">Total sold item </div>{" "}
            <div className="w-1/3">{statisticsData && statisticsData.totalSoldItems ? statisticsData.totalSoldItems : "Loading" }</div>
          </div>
          <div className="flex">
            <div className="w-2/3">Total not sold item </div>{" "}
            <div className="w-1/3">{statisticsData && statisticsData.totalNotSoldItems ? statisticsData.totalNotSoldItems : "Loading" }</div>
          </div>
        </div>
      </div>
    </>
  );
};
