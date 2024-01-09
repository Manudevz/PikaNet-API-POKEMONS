import PokemonProvider from "../src/context/PokemonsAppProvider";
import DisplayPokemons from "../src/components/DisplayPokemons";
import MenuOptions from "./components/MenuOptions";

const App = () => {
  return (
    <div style={{ display: 'flex' }} >
      <PokemonProvider >
        <MenuOptions />
        <DisplayPokemons />
      </PokemonProvider>
    </div >
  );
}

export default App;
