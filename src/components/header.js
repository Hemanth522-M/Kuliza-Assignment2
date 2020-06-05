import React from  'react';

import Logo from '../media/kulizaLogo.jpg';
import './styles.css';

class Header extends React.Component {

    render() {
        return(
            <div className="header">
                <img src={Logo} alt="" className="logo" />
                <h1 className="name">Kuliza Technologies</h1>
            </div>
        )
    }
}

export default Header;