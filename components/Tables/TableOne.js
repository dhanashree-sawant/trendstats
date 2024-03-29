import Image from "next/image";

const brandData= [
  {
    Tickersymbol: "BTCUSDT",
    price: "$70000.00",
    shares: 0.02,
    buyprice: "$68000.00",
    todaygain: "$700.00",
    todaygainpercent: "1%",
    totalchange: "$2000",
    totalpercentchange: "2.8%",
    value: "$1400"
  },
  {
    Tickersymbol: "XRPUSDT",
    price: "$0.6320",
    shares: 10,
    buyprice: "$0.6120",
    todaygain: "$0.006",
    todaygainpercent: "1%",
    totalchange: "$0.020",
    totalpercentchange: "2.8%",
    value: "$6.320"
  },
 
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Trades
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
          <div className="p-1.5 text-center xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Ticker/symbol
            </h5>
          </div>
          <div className="p-1.5 text-center xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="p-1.5 text-center xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Shares/Lots
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Buy Price
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Today's gain
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Today's % gain
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Total change
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Total % change
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Value
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-9 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-1.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">
                {brand.Tickersymbol}
              </p>
             
            </div>
            <div className="flex items-center justify-center p-1.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">
                {brand.price}
              </p>
              </div>
            <div className="flex items-center justify-center p-1.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.shares}</p>
            </div>

            <div className="flex items-center justify-center p-1.5 xl:p-5">
              <p className="text-meta-3">{brand.buyprice}</p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.todaygain}</p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.todaygainpercent}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.totalchange}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.totalpercentchange}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
