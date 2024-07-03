import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      <div>
        <h1>Root</h1>
        <Link to="/about">About</Link>
      </div>
    </>
  );
}

export default Root;
