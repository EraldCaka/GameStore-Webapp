import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Register, Landing, Error } from "./pages";
import {
  UserHomePage,
  Library,
  Store,
  Wishlist,
  Account,
  CartCard,
} from "./pages/user/index";
import { GameInfo } from "./pages/store/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/homepage" element={<UserHomePage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartCard />} />{" "}
        {/* Added route for /cart */}
        <Route path="/store" element={<Store />} />
        <Route path="/store/:gameId" element={<GameInfo />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
