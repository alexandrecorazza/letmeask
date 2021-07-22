import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { ThemeContextProvider } from './contexts/ThemeContext';

import { Home } from "./pages/Home";
import { Room } from './pages/Room';
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom } from './pages/AdminRoom';
import GlobalStyle from './styles/global'

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <GlobalStyle />
        <AuthContextProvider>
          <Switch>  {/* O Switch não deixa duas rotas serem chamadas ao mesmo tempo. Logo, se uma rota foi acessada, ele para de procurar por outras que satisfaçam o mesmo endereço */}
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
