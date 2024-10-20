import React, { useState } from 'react';
import DisplayInfo from './DisplayInfo';
import Dashboard2 from './Dashboard2';
// import Dashboard3Tablu from './Dashboard3_tablu';

const Nav = () => {
  const [activeComponent, setActiveComponent] = useState('D1');

  const handleNavigation = (e, component) => {
    e.preventDefault(); // Prevent page reload
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'D1':
        return <DisplayInfo />;
      case 'D2':
        return <Dashboard2 />;
      case 'D3':
        return <Dashboard3Tablu />;
      default:
        return <DisplayInfo />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{ marginBottom: '20px' }}>
        <a
          href="#D1"
          onClick={(e) => handleNavigation(e, 'D1')}
          style={{
            ...linkStyle,
            color: activeComponent === 'D1' ? 'red' : '#007bff',
          }}
        >
          DisplayInfo
        </a>
        <a
          href="#D2"
          onClick={(e) => handleNavigation(e, 'D2')}
          style={{
            ...linkStyle,
            color: activeComponent === 'D2' ? 'red' : '#007bff',
          }}
        >
          Dashboard2
        </a>
        <a
          href="#D3"
          onClick={(e) => handleNavigation(e, 'D3')}
          style={{
            ...linkStyle,
            color: activeComponent === 'D3' ? 'red' : '#007bff',
          }}
        >
          Dashboard3 Tablu
        </a>
      </nav>

      <div>{renderComponent()}</div>
    </div>
  );
};

const linkStyle = {
  marginRight: '15px',
  padding: '8px 12px',
  textDecoration: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: '1px solid transparent',
  borderRadius: '5px',
  transition: 'all 0.2s ease',
};

export default Nav;
