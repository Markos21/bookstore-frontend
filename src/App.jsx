import AppRouter from "./routers/AppRouter";
import ThemeContext from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

import "./App.css";

const App = () => (
  <div className="App">
    <UserProvider>
      <CartProvider>
        <ThemeContext light>
          <AppRouter />
        </ThemeContext>
      </CartProvider>
    </UserProvider>
  </div>
);

export default App;
