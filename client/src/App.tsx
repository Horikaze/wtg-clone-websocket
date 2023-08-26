import Player from "./components/Player";
import Users from "./components/Users";

function App() {
  return (
    <>
      <div className="flex flex-row gap-2 justify-between">
        <Users />
        <Player />
      </div>
    </>
  );
}

export default App;
