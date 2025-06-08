import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Button
      variant="outline-light"
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }
    >
      Log Out
    </Button>
  ) : (
    <Button variant="outline-light" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}
