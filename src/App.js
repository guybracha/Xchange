import './App.css';
import Fetch from './comp/Fetch';
import Footer from './comp/Footer';
import Header from './comp/Header';
import ExchangeAPP from './comp/ExchangeAPP';

function App() {
  return (
    <div className='container-sm'>
    <div className='raindow'>
      <Header/>
      <hr/>
        <Fetch/>
        <div className='row'>
        <div className='col-sm'>
         <ExchangeAPP/>
        </div>
        </div>
    </div>
    <Footer/>
  </div>
  );
}

export default App;
