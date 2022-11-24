import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./screens/routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Shop from "./screens/Shop";
import Add from "./screens/Add";
import ShopWelcome from "./screens/ShopWelcome";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
    <HelmetProvider>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route 
          path={routes.home} 
          element={isLoggedIn ? <Layout><Home /></Layout> : <Login />}
        />
        {!isLoggedIn ? (
          <Route 
            path={routes.signUp} 
            element={<SignUp />}
          />) : null}
        <Route 
          path={routes.shop}
          element={<Shop />}
        />
        <Route 
          path={routes.shopWelcome}
          element={<ShopWelcome />}
        />
        <Route 
          path={routes.add}
          element={isLoggedIn ? <Add /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;