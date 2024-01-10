import PokemonProvider from "../src/context/PokemonsAppProvider";
import DisplayPokemons from "../src/components/DisplayPokemons";
import MenuOptions from "./components/MenuOptions";

const App = () => {
  return (
    <PokemonProvider >
      <div className="flex relative">
        <DisplayPokemons />
        <MenuOptions />
      </div >
    </PokemonProvider>
  );
}

export default App;
