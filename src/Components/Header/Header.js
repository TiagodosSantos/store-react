import React from 'react';
import LinkWrapper from '../../Utils/LinkWrapper';

const Header = () => {
    return (
        <nav>
        <div className="nav-wrapper teal lighten-2">
          <LinkWrapper to="/" className="brand-logo" activeStyle={{}}>Smartest IT Solutions ME</LinkWrapper >
            <ul className="right">
                <li><LinkWrapper to="/">Clientes</LinkWrapper></li>
                <li><LinkWrapper to="/invoices">Faturas</LinkWrapper></li>
            </ul>
        </div>
      </nav>
    );
}

export default Header;