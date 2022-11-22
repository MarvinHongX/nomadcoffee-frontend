import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import routes from "./screens/routes";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    navigate(routes.home, {replace: true});
    window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
  };
  
  export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  };
  
export const client = new ApolloClient({
    uri: "https://marvincoffee.herokuapp.com/graphql",
    cache: new InMemoryCache()
});