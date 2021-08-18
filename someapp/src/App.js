import './App.css';
import react, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  const apikey = process.env.NOMICS_URI;
 

  const [cryptos, setCryptos] = useState([])
  const [allCryptos, setAllCryptos] = useState([])
  const [search, setSearch] = useState('')

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
      <Cryptos />
      <Filter findCrypto={findCrypto} />
      <List allCryptos ={allCryptos} search = {search} />
    </div>
  );
}

const Cryptos = () => {


  return (
    <div>
      <p><strong>Your Portfolio</strong></p>
    </div>
  )
}

const Filter = ({findCrypto}) => {

  return(
    <div>
    <p>Search by Symbol</p>
    <input onChange={findCrypto}/>
    </div>
    
  )
}

const List = ({allCryptos, search}) => {


  if(search===''){
  return (
    <table>
      <tbody>
      {allCryptos.map(x => <tr key={x.id}><td><strong>{x.id}</strong></td><td> {x.name}</td><td> {x.price} </td><td><img src={x.logo_url}></img></td></tr>)}
      </tbody>
    </table>
    )
  }
  else{
    return(
    <table>
      <tbody>
    {allCryptos
    .filter(x => x.id.includes(search))
    .map(x => <tr key={x.id}><td><strong>{x.id}</strong></td><td> {x.name}</td><td> {x.price} </td><td><img src={x.logo_url}></img></td></tr>)}
    </tbody>
  </table>
    )

  }
}

const Total = () => {

}

export default App;