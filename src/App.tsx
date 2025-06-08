import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { SkillList } from "./components/SkillList";
import { SkillMap } from "./components/SkillMap";
import AuthButtons from "./components/AuthButtons"; // import the auth buttons component
import { useAuth0 } from "@auth0/auth0-react";
import GetTokenButton from './components/TestButton';

export function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand>🗺️ Stack Map</Navbar.Brand>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated && user && (
              <div className="d-flex align-items-center text-white gap-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  width="32"
                  height="32"
                  style={{ borderRadius: "50%" }}
                />
                <span>{user.name}</span>
              </div>
            )}
            <ThemeSwitcher />
            <AuthButtons />
          </div>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col md={4}>
            <SkillList />
          </Col>
          <Col md={8}>
            <SkillMap />
            <GetTokenButton />
          </Col>
        </Row>
      </Container>
    </>
  );
}
