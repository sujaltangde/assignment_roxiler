import { useState } from "react";
import { useEffect } from "react";
import { TransactionStatistics } from "./TransactionStatistics";
import { TransactionsBarChart } from "./TransactionsBarChart";
import axios from "axios";

export const TransactionTable = () => {

  const [selectedMonth, setSelectedMonth] = useState("March");
  const [statisticsData, setStatisticsData] = useState({}) ;
  const [barChartData, setBarChartData] = useState({}) ;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const analytics = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/analytics/${months.indexOf(selectedMonth) + 1}`);

      if(res.data.success){
        setStatisticsData(res.data.combinedData.statistics)
        setBarChartData(res.data.combinedData.barChartData)

        console.log(res.data)
      }

    };

    analytics();
  }, [selectedMonth]);


  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString().slice(0, 9);
  };

  


  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <>
      <div className="min-h-screen ">
        <div className="flex justify-center items-center flex-col ">
          <div className="bg-white w-1/3 flex gap-2 justify-center items-center text-2xl font-semibold py-5 mt-5 rounded-full">
            <p>Transaction</p>
            <p>Dashboard</p>
          </div>

          <div className="flex mt-12 justify-between w-full px-14">
            <div>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="text"
                  placeholder="Search transaction"
                  className="border border-gray-300 outline-none px-2 py-1"
                />
                <button className="text-sm font-semibold bg-yellow-300 py-1.5 px-4 rounded-md">
                  Search
                </button>
              </div>
            </div>
            <div>
              <div className="flex gap-1">
                <label
                  className="text-sm font-semibold bg-yellow-300 py-1.5 px-4 rounded-md"
                  htmlFor="monthSelect"
                >
                  Select Month
                </label>
                <select
                  id="monthSelect"
                  className="text-sm font-semibold bg-white py-1.5 px-4 rounded-md"
                  value={selectedMonth}
                  onChange={handleChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="px-12 mt-6 ">
            <table className="table-auto bg-white">
              <thead className="py-3">
                <tr className="text-left   bg-yellow-300">
                  <th className="p-3">Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Sold</th>
                  <th>Date Of Sale</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b font-semibold border-gray-400 ">
                  <td className="px-3 ">1</td>
                  <td className="font-semibold">Mens Cotton Jacket</td>
                  <td className="text-xs w-1/5">
                    great outerwear jackets for SpringAutumnWinter suitable for
                    many occasions such as working hiking camping mountainrock
                    climbing cycling traveling or other outdoors. Good gift
                    choice for you or your family member. A warm hearted love to
                    Father husband or son in this thanksgiving or Christmas Day.
                  </td>
                  <td>&#x20B9; 615.89</td>
                  <td>men's clothing</td>
                  <td>Yes</td>
                  <td>{formatDate("2022-07-27T20:29:54+05:30")}</td>
                  <td className="py-2">
                    <img
                      src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                      className="w-32"
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between px-2 font-semibold py-2">
              <div>
                <p>Page No: 1</p>
              </div>
              <div className="flex gap-2">
                <button>Next</button> -<button>Previous</button>
              </div>
              <div>
                <p>Per Page: 10</p>
              </div>
            </div>
          </div>
        </div>

        <TransactionStatistics statisticsData={statisticsData}  />
        <TransactionsBarChart barChartData={barChartData} />
      </div>
    </>
  );
};
