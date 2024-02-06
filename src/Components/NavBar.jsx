import { Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'

export default function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/articles">All Articles</Nav.Link>
          <NavDropdown title="Topics" id="basic-nav-dropdown">
            <NavDropdown.Item href="/topics">All Topics</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}
