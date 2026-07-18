import { useEffect, useState } from "react";
import "./Usuarios.css";
import UsuarioCard from "../UsuarioCard/UsuarioCard";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [recargarKey, setRecargarKey] = useState(0);

  useEffect(() => {
    async function obtenerUsuarios() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Error ${res.status}: no se pudieron obtener los usuarios`);
        }

        const data = await res.json();
        setUsuarios(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Ocurrió un error al obtener los usuarios");
        setLoading(false);
      }
    }

    obtenerUsuarios();
  }, [recargarKey]);

  const handleRecargar = () => {
    setRecargarKey((prev) => prev + 1);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="usuarios">
      <div className="usuarios__toolbar">
        <input
          type="text"
          className="usuarios__buscador"
          placeholder="Buscar usuario por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          disabled={loading}
        />
        <button
          type="button"
          className="usuarios__recargar"
          onClick={handleRecargar}
          disabled={loading}
        >
          Recargar
        </button>
      </div>

      {loading && <p className="usuarios__estado">Cargando usuarios...</p>}

      {!loading && error && (
        <p className="usuarios__estado usuarios__estado--error">{error}</p>
      )}

      {!loading && !error && usuarios.length > 0 && (
        <ul className="usuarios__lista">
          {usuariosFiltrados.map((usuario) => (
            <UsuarioCard key={usuario.id} usuario={usuario} />
          ))}
        </ul>
      )}

      {!loading && !error && usuarios.length > 0 && usuariosFiltrados.length === 0 && (
        <p className="usuarios__estado">
          No se encontraron usuarios que coincidan con "{busqueda}"
        </p>
      )}
    </section>
  );
}

export default Usuarios;
