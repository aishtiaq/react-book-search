import React from "react";
import {Link} from "react-router-dom"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Book Search
      </a>
      <Link className="text-white mx-1" to={"/books"}>
        Search
      </Link>
      <Link className="text-white mx-1" to={"/savedbooks"}>
        Saved Books
      </Link>
    </nav>
  );
}

export default Nav;
