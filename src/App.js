import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nvbar from './components/Nvbar';
import Home from './components/Home';
import RealEstate from './components/re/RealEstate';
import Dex from './components/dex/Dex';
import Footer from './components/Footer';
import WalletConnect from './components/WalletConnect';

const App = ({accounts, blockchain, reContracts, dexContracts}) => {

  return (
    
    <BrowserRouter>
      <div className="home">
        <Nvbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/realestate' component={() => <RealEstate blockchain={blockchain} accounts={accounts} contracts={reContracts}/> } />
          <Route exact path='/dex' component={() => <Dex blockchain={blockchain} accounts={accounts} contracts={dexContracts}/> } />
        </Switch>
        <Footer/> 
      </div>
    </BrowserRouter>
  
  );
}

export default App;
