import "./App.css";
import { Events } from "./Components/Events";
import { EventButtons } from "./Components/EventButtons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Events />
        <EventButtons />
      </header>
    </div>
  );
}

export default App;
