import PokemonProvider from "../src/context/PokemonsAppProvider";
import { Home } from './pages/Home';

const App = () => {
  return (
    <PokemonProvider >
      <Home />
    </PokemonProvider>
  );
}

export default App;
