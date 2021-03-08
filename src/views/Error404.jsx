import { Link } from "react-router-dom";

export const Error404 = ({ msg, linkTo }) => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <div className="error-container">
        <span>4</span>
        <img src="../img/pokeball.svg" alt="" />
        <span>4</span>
      </div>
      <h3>{msg}</h3>
      <p>
        <Link to={`${linkTo}`}>back</Link>
      </p>
    </div>
  );
};
