function UsuarioCard({ usuario }) {
  return (
    <li className="usuario-card">
      <h3 className="usuario-card__nombre">{usuario.name}</h3>
      <p className="usuario-card__email">{usuario.email}</p>
    </li>
  );
}

export default UsuarioCard;
