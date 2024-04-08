import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import DefaultLayout from "../defaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CurrencyInput from 'react-currency-input-field';

const InsertDayTrade=() => {
    const [searchData,setSearchData] = useState([]);
    const [isDivOpen,setIsDivOpen] = useState(false);
    const [tickerPrice,setTickerPrice] = useState(0);
    const [selectedSearch,setSelectedSearch] = useState('');
    const [selectedTicker,setSelectedTicker] = useState([]);
    const baseURL = 'https://financialmodelingprep.com/api/v3/';
    const APIKey = 'b87ac7126c3632e79564e8bc76f28d60';

    async function onSubmit(event){
        event.preventDefault()
    }
    async function tickerChange(event){
      
      let searchTerm = event.target.value;
      setSelectedSearch(searchTerm)
      let appendUrl = 'search?query=' + searchTerm+ '&limit=5&apikey='+APIKey;
      console.log('search?query=' + searchTerm+ '&limit=5&apikey='+APIKey)
      console.log(baseURL+ appendUrl)
      const response = await fetch(baseURL+ appendUrl, {
          method: 'GET',
          cache:'no-cache'
        })
      let data = await response.json();
      setSearchData(data);
      console.log(data);
      setIsDivOpen(true);

    }

    async function valueSelect(value){
      let ticker = value.symbol;
      const response = await fetch(baseURL+ 'stock/full/real-time-price/' + ticker+'?apikey=' + APIKey,{
        method: 'GET',
        cache:'no-cache'
      })

      let data = await response.json();
      console.log(data)
      setTickerPrice(data[0].fmpLast)
      setSelectedSearch(value.symbol);
      setSelectedTicker(value);
      setIsDivOpen(false);
    }

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Insert day trading entry" />

        {/* Form fields */}
        <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col p-6.5">
                <label className="search-label-custom block text-sm font-medium text-black dark:text-white">
                  Ticker/symbol
                </label>
                <input
                  type="text"
                  placeholder="Enter symbol"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="ticker_symbol"
                  onChange={tickerChange}
                  onFocus={()=>setIsDivOpen(true)}
                  value={selectedSearch}
                  
                />
                <div style={isDivOpen ? {display:'block'}: {display:'none'}} className="search-data-custom-div">
                {
                  searchData.map((data)=>{
                    return <div id={data.symbol} key={data.symbol} onClick={()=>valueSelect(data)} className="px-3 py-3 divide-slate-200 search-data-custom">{data.symbol}</div>
                  })
                }
                </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                  Price
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={tickerPrice}

                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                  Shares/Lots
                </label>
                <CurrencyInput
                  placeholder="Enter number of shares"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={0}
                  onValueChange={(value, name, values) => console.log(value, name, values)}

                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Buy Price
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"

                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Today's gain
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={0}
                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Today's % gain
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  suffix="%"
                  disabled
                  value={0}
                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Total change
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={0}
                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Total % change
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  suffix="%"
                  disabled
                  value={0}
                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <label className=" block text-sm font-medium text-black dark:text-white">
                 Value
                </label>
                <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={0}
                />
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                <button type="submit" name="submit" className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn">Submit</button>
                </div>
                </div>
            </div>
        </div>
        </form>
          
        
      </DefaultLayout>
    );
  };
  
  export default InsertDayTrade;