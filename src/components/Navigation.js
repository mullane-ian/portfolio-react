import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    
    <header>
      <div className='header-inner'>
                 <Link className="logo" to="/">
             Ian Mullane.
           </Link>
        <nav>
          <ul>
            <li>
            <Link className="nav-link" to="/Resume">
                   Resume
                 
                 </Link>
            </li>
            <li>
            <Link className="nav-link" to="/Work">
                   Work
                 </Link>
            </li>
            <li>
            <Link className="nav-link" to="/contact">
                   Contact
                 </Link>
            </li>
  
            {/* <li className='btn'>
              <a href='/'>Contact</a>
            </li> */}
           
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default withRouter(Navigation);