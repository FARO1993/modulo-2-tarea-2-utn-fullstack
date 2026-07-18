
import "./App.css";
import Usuarios from "./components/Usuarios/Usuarios";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Listado de usuarios</h1>
        <p>Consumo de API REST con fetch, useState y useEffect</p>
      </header>
      <Usuarios />
    </div>
  );
}

export default App;
