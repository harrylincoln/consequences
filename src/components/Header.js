import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav>
       <div className="nav-wrapper">
         <Link to={this.props.auth ? '/dashboard' : '/'}
         className="center brand-logo">Consequences</Link>
       </div>
     </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
