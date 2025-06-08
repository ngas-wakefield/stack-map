
import { useAuth0, type RedirectLoginOptions } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

interface MyRedirectLoginOptions extends RedirectLoginOptions {
  audience?: string;
  scope?: string;
}

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const options: MyRedirectLoginOptions = {
    audience: "https://api.stackmap.dev",
    scope: "openid profile email read:skills write:skills delete:skills",
  };

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
    <Button variant="outline-light" onClick={() => loginWithRedirect(options)}>
      Log In
    </Button>
  );
}
