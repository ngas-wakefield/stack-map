import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Navbar, Image } from "react-bootstrap";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { SkillList } from "./components/SkillList";
import { SkillMap } from "./components/SkillMap";
import AuthButtons from "./components/AuthButtons";
import { useAuth0 } from "@auth0/auth0-react";

export function App() {
  const { user, isAuthenticated } = useAuth0();

  console.log("User object:", user); // For debugging
console.log("Auth0 user:", user);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand>🗺️ Stack Map</Navbar.Brand>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated && user && user.picture && user.name && (
              <Navbar.Text className="d-flex align-items-center gap-2 text-white">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={32}
                  height={32}
                  roundedCircle
                />
                <span>{user.name}</span>
              </Navbar.Text>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
