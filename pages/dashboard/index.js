import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "./defaultLayout";
import TableOne from "@/components/Tables/TableOne";
import { useState, useEffect } from "react";
import CurrencyInput from 'react-currency-input-field';


const SignIn=() => {
  const [brandData,setBrandData] = useState([]);
  const [searchData,setSearchData] = useState([]);
  const [isDivOpen,setIsDivOpen] = useState(false);
  const [tickerPrice,setTickerPrice] = useState(0);
  const [selectedSearch,setSelectedSearch] = useState('');
  const [selectedTicker,setSelectedTicker] = useState([]);
  const [dayGain,setDayGain] = useState(0);
  const [dayPercentGain,setDayPercentGain] = useState(0);
  const [initialdayGain,setinitialDayGain] = useState(0);
  const [initialdayPercentGain,setinitialDayPercentGain] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [totalChange,setTotalChange] = useState(0);
  const [totalPercentChange, setTotalPercentChange] = useState(0);
  const [noofshares, setNoofshares] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [addEntryToggle,setAddEntryToggle] = useState(false)


  const baseURL = 'https://financialmodelingprep.com/api/v3/';
  const APIKey = 'b87ac7126c3632e79564e8bc76f28d60';

  useEffect(()=>{
  fetchEntries()
  },[])

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
  if(data.length==0){
    alert('The current ticker is inactive, kindly select different ticker');
  }
  else{
    setTickerPrice(parseFloat(data[0].fmpLast))

    let d = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate()-7)
    const response2 = await fetch(baseURL+ 'historical-price-full/' + ticker  +'?apikey=' + APIKey + '&from='+d2.toISOString().substring(0,10)+'&to=' + d.toISOString().substring(0,10),{
      method: 'GET',
      cache:'no-cache'
    })
    //exchangeShortName
    let data2 = await response2.json();
    console.log(data2)
    if(Object.keys(data2).length==0){
      setIsDivOpen(false);
      alert('The current ticker is inactive, kindly select different ticker');
      setSelectedSearch('');
      setSearchData([]);
    }
    else{
      setDayGain(parseFloat(data2.historical[0].change))
      setDayPercentGain(parseFloat(data2.historical[0].changePercent))
      setinitialDayGain(parseFloat(data2.historical[0].change))
      setinitialDayPercentGain(parseFloat(data2.historical[0].changePercent))
      setSelectedSearch(value.symbol);
      setSelectedTicker(value);
      setIsDivOpen(false);
    }
  }
}

async function setNoofShareschange(event){
  let no_of_shares = event.target.value;
  if(no_of_shares==''){
    setDayGain(0)
    setNoofshares(0);
    setTotalValue(0);
  }
  else{
    setDayGain(initialdayGain * parseFloat(no_of_shares))
    setNoofshares(no_of_shares)
    setTotalValue(tickerPrice * no_of_shares)
  }
}

async function setBuyPricechange(event){
  let buy_price = event.target.value;
  if(buy_price==''){
    setBuyPrice(0)
    setTotalChange(0)
    setTotalPercentChange(0);
  }
  else{
    
    if(buy_price.charAt(0) == '$'){
      console.log(buy_price)
      buy_price = buy_price.substring(1,buy_price.length)
    }
    setBuyPrice(buy_price)
    console.log(buy_price)
    setTotalChange((tickerPrice * noofshares) - (parseFloat(buy_price) * noofshares))
    setTotalPercentChange(((tickerPrice * noofshares) - (parseFloat(buy_price) * noofshares))/(parseFloat(buy_price)* noofshares)*100);
  }
}

async function saveClick(event){
  event.preventDefault();
  if(selectedSearch=='' || tickerPrice == 0 || noofshares == 0 || buyPrice==0 || dayGain==0 || dayPercentGain==0 || totalChange==0 || totalPercentChange==0 || totalValue ==0){
    alert("Kindly insert all values before clicking on save")
  }
  else{
    const response = await fetch('/api/insertEntry', {
      method: 'POST',
      body: [selectedSearch,tickerPrice,noofshares,buyPrice,dayGain,dayPercentGain,totalChange,totalPercentChange,totalValue],
    })
    if(response.ok){
      setSearchData([]);
      setIsDivOpen(false);
      setTickerPrice(0);
      setSelectedSearch('');
      setSelectedTicker([]);
      setDayGain(0);
      setDayPercentGain(0);
      setinitialDayGain(0);
      setinitialDayPercentGain(0);
      setBuyPrice(0);
      setTotalChange(0);
      setTotalPercentChange(0);
      setNoofshares(0);
      setTotalValue(0);
      fetchEntries();
      setAddEntryToggle(false)
    }
  }
  
}

async function cancelClick(event){
  event.preventDefault();
  setSearchData([]);
  setIsDivOpen(false);
  setTickerPrice(0);
  setSelectedSearch('');
  setSelectedTicker([]);
  setDayGain(0);
  setDayPercentGain(0);
  setinitialDayGain(0);
  setinitialDayPercentGain(0);
  setBuyPrice(0);
  setTotalChange(0);
  setTotalPercentChange(0);
  setNoofshares(0);
  setTotalValue(0);
  setAddEntryToggle(false);
}

async function fetchEntries(){
  const response = await fetch('/api/fetchentries',{
    method: 'GET'
  })
  if(response.ok){
    setBrandData(await response.json())
  }
}


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Day trading" />
      <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Trades
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-9">
          <div className="p-1.5 text-center xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Ticker/symbol
            </h5>
          </div>
          <div className="p-1.5 text-center xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="p-1.5 text-center xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Shares/Lots
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Buy Price
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Today's gain
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Today's % gain
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Total change
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              Total % change
            </h5>
          </div>
          <div className="hidden p-1.5 text-center sm:block xl:py-3 xl:px-1">
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
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
            <p className="hidden text-black dark:text-white sm:block">
                {brand.Tickersymbol}
              </p>
             
            </div>
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
            <p className="hidden text-black dark:text-white sm:block">
                {brand.price.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}
              </p>
              </div>
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
              <p className="text-black dark:text-white">{brand.shares}</p>
            </div>

            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
              <p className="text-meta-3">{brand.buyprice.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-black dark:text-white">{brand.todaygain.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">{brand.todaygainpercent.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">{brand.totalchange.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">{brand.totalpercentchange.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">{brand.value.toString().split(".").map((el,i)=>i?el.split("").slice(0,4).join(""):el).join(".")}</p>
            </div>
          </div>
        ))}
        <div
            className="grid grid-cols-3 sm:grid-cols-9" style={addEntryToggle ? {display: 'none'} : {display: 'block'}}
          >
            <h2 className="p-1.5 xl:py-3 xl:px-1"><button type="button" onClick={()=>{setAddEntryToggle(true)}} title="Add Entry" className="text-green font-medium rounded-lg text-xs 2xl:text-sm px-1 py-1 text-center">+ Add Entry</button></h2>
          </div>
        <form onSubmit={onSubmit} style={addEntryToggle? {display:'block'}: {display:'none'}}>
        <div
            className="grid grid-cols-3 sm:grid-cols-9"
          >
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                    return <div id={data.symbol} key={data.symbol} onClick={()=>valueSelect(data)} className="px-3 py-2 divide-slate-200 search-data-custom">{data.symbol}</div>
                  })
                }
                </div>
              </div>
             
            </div>
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
            <p className="hidden text-black dark:text-white sm:block">
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
              </p>
              </div>
            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
              <p className="text-black dark:text-white">
              <CurrencyInput
                  placeholder="Enter number of shares"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="no_of_shares"
                  decimalsLimit={0}
                  onChange={setNoofShareschange}
                  value={noofshares}
                />
              </p>
            </div>

            <div className="flex items-center justify-center p-1.5 xl:py-3 xl:px-1">
              <p className="text-meta-3">
              <CurrencyInput
                  placeholder="Enter buy price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="buy_price"
                  decimalsLimit={4}
                  onChange={setBuyPricechange}
                  prefix="$"
                  value={buyPrice}

                />
              </p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-black dark:text-white">
              <CurrencyInput
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="today_change"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={dayGain}
                />
              </p>
            </div>

            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">
              <CurrencyInput
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="today_percent_change"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  suffix="%"
                  disabled
                  value={dayPercentGain}
                />
              </p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">
              <CurrencyInput
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="total_change"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={totalChange}
                />
              </p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5">
              <CurrencyInput
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="today_percent_change"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  suffix="%"
                  disabled
                  value={totalPercentChange}
                />
              </p>
            </div>
            <div className="hidden items-center justify-center p-1.5 sm:flex xl:py-3 xl:px-1">
              <p className="text-meta-5 flex">
              <CurrencyInput
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary flex-3"
                  name="total_value"
                  decimalsLimit={4}
                  onValueChange={(value, name, values) => console.log(value, name, values)}
                  prefix="$"
                  disabled
                  value={totalValue}
                />
                <button type="button" title="Save" onClick={saveClick} className="text-green font-medium rounded-full text-xs 2xl:text-sm px-1 py-1 text-center flex-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </button>
                <button type="button" onClick={cancelClick} title="Cancel" className="text-red font-medium rounded-lg text-xs 2xl:text-sm px-1 py-1 text-center flex-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </button>
              </p>
            </div>
          </div>
          </form>
      </div>
    </div>  
      
    </DefaultLayout>
  );
};

export default SignIn;
