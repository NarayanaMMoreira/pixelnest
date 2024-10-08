import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { FaUser } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const Logo = styled.div`
  h1 {
    color: #ffffff;
    margin: 0;
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    right: 0;
    height: 90vh;
    width: 100%;
    background-color: var(--primary-color);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }
  }
`;

const NavItem = styled.li`
  margin: 0;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--secondary-color);
  }
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: #ffffff;
  border-radius: 20px;
  color: var(--primary-color) !important;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const UserIcon = styled(Link)`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1.5rem;

  &:hover {
    color: var(--secondary-color);
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
  transition: 0.3s;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Fecha o menu quando a rota muda
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      setIsLoggedIn(false); 
      navigate('/');
    }
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false); // Fecha o menu
    }
  };

  // Função que seta o token e atualiza o estado de login dinamicamente
  const setToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Atualiza o estado de isLoggedIn para true
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false); // Atualiza o estado de isLoggedIn para false
    }
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <Logo>
          <h1>PixelNest</h1>
        </Logo>
        <NavLinks className={isOpen ? 'open' : ''}>
          <NavItem><NavLink to="/" onClick={closeMenu}>Home</NavLink></NavItem>
          <NavItem><NavLink to="/galeria" onClick={closeMenu}>Galeria</NavLink></NavItem>
          <NavItem><NavLink to="/educa-mais" onClick={closeMenu}>Educa+</NavLink></NavItem>
          {isLoggedIn ? (
            <>
              <NavItem>
                <UserIcon to="/user/profile" onClick={closeMenu}>
                  <FaUser />
                </UserIcon>
              </NavItem>
              <NavItem>
                <Button as="button" onClick={() => { handleLogout(); closeMenu(); }}>Sair</Button>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <Button to="/login" onClick={closeMenu}>Fazer Login</Button>
            </NavItem>
          )}
        </NavLinks>
        <Hamburger onClick={toggleMenu}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
