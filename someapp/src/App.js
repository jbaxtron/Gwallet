import './App.css';
import react, { useState, useEffect } from 'react'
import axios from 'axios'
const formatter = require('./numFormat')


function App() {

  const apikey = process.env.NOMICS_URI;


  const [cryptos, setCryptos] = useState([])
  const [allCryptos, setAllCryptos] = useState([])
  const [search, setSearch] = useState('')


  const [coins, setCoins] = useState([
    {
      id: "BTC",
      name: "Bitcoin",
      amount: "12",
      price: "0",
      value: 0
    },
    {
      id: "ADA",
      name: "Cardano",
      amount: "8000",
      price: "0",
      value: 0
    }

  ])

  useEffect(() => {
    axios
      .get(`https://api.nomics.com/v1/currencies/ticker?key=7993c02a73ba6678789b8f51e7ac2fecd12a3bc5&interval=1d,30d&convert=USD`)
      .then(response => setAllCryptos(response.data))




  }, [])

  const findCrypto = (event) => {
    return setSearch(event.target.value)

  }


  return (

    <div>
      <div>

        <h1>
          G-Wallet
        </h1>

      </div>
      <Cryptos coins = {coins} allCryptos={allCryptos}/>
      <Total coins= {coins} allCryptos={allCryptos}/>
      <Filter findCrypto={findCrypto} />
      <List allCryptos={allCryptos} search={search} />
    </div>
  );
}

const Cryptos = ({coins, allCryptos}) => {


  return (
    <div>
      <p><strong>Your Portfolio</strong></p>
      <Wallet coins= {coins} allCryptos={allCryptos}/>
    </div>
  )
}

const Filter = ({ findCrypto }) => {

  return (
    <div>
      <br></br>
      <p>Search by Symbol</p>
      <input onChange={findCrypto} />
    </div>

  )
}

const List = ({ allCryptos, search }) => {


  if (search === '') {
    return (
      <table>
        <tbody>
          {allCryptos.map(x => <tr key={x.id}><td><strong>{x.id}</strong></td><td> {x.name}</td><td> {x.price} </td><td><img src={x.logo_url}></img></td><td><input type="text"></input><button>Add</button></td></tr>)}
        </tbody>
      </table>
    )
  }
  else {
    return (
      <table>
        <tbody>
          {allCryptos
            .filter(x => x.id.includes(search))
            .map(x => <tr key={x.id}><td><strong>{x.id}</strong></td><td> {x.name}</td><td> {x.price} </td><td><img src={x.logo_url}></img></td><td><input type="text"></input><button>Add</button></td></tr>)}
        </tbody>
      </table>
    )

  }
}


const Wallet = ({ coins, allCryptos }) => {

  const currentValue = (id) =>{

    const price =  allCryptos.filter(x => x.id === id)
    .map(x =>x.price)
  
    return price
  }

  return (
    <div>
      {coins.map(coin => <p key={coin.id}> {coin.name} {coin.amount} {formatter.formatter.format(currentValue(coin.id))} {formatter.formatter.format(((parseInt(coin.amount)) * parseFloat(currentValue(coin.id))))}</p>)}
    </div>
  )
}

const Total = ({coins}) => {
  const value = coins.map(x => parseInt(x.value)).reduce((x, y) => x + y)
  console.log(`total value : ${value}`)

  return (
    <p>Your total portfolio value is : {formatter.formatter.format(value)}</p>
  )
}

export default App;