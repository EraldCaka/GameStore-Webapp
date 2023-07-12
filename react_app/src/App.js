import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Register, Landing, Error } from "./pages";

//user imports
import {
  UserHomePage,
  Library,
  Store,
  Wishlist,
  Account,
  CartCard,
} from "./pages/user/index";
import { GameInfo } from "./pages/store/index";

//admin imports
import { Admin, Games, Users, Profile } from "./pages/admin/pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User router Paths*/}
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/library" element={<Library />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartCard />} />{" "}
        <Route path="/store" element={<Store />} />
        <Route path="/store/:gameId" element={<GameInfo />} />
        <Route path="*" element={<Error />} />
        {/* Admin router Paths*/}
        <Route path="/admin" element={<Admin />} />
        <Route path="/games" element={<Games />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
