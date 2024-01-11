import PokemonProvider from "../src/context/PokemonsAppProvider";
import DisplayPokemons from "../src/components/DisplayPokemons";
import MenuOptions from "./components/MenuOptions";

const App = () => {
  return (
    <PokemonProvider >
      <main className="flex relative">
        <DisplayPokemons />
        <MenuOptions />
      </main >
    </PokemonProvider>
  );
}

export default App;
