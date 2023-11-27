import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useAdminLogoutMutation } from '../../slices/adminApiSlice.js';
import { logout } from '../../slices/adminAuthSlice.js';

const AdminHeader = () => {

  const { adminInfo } = useSelector( (state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useAdminLogoutMutation();

  const logOutHandler = async () => {

    try {
    
      await logoutApiCall().unwrap();

      dispatch( logout() );

      navigate( '/admin' );

    } catch (err) {

      console.log( err );

    }

  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/admin">
            <Navbar.Brand>Mykare Health Admin</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ms-auto">

              { adminInfo ? (

                <>

                  <NavDropdown title={adminInfo.name} id="userName">

                    <LinkContainer to='/admin/profile'>
                      <NavDropdown.Item> Profile </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={ logOutHandler } > Logout </NavDropdown.Item>

                  </NavDropdown>

                </>
                
              ) : (
                <>
                  <LinkContainer to="/admin/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/admin/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) }

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;