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
import { GameInfo, Transactions } from "./pages/store/index";

//admin imports
import {
  Admin,
  Games,
  Users,
  Profile,
  NewGame,
  Transactions as AdminTransactions,
} from "./pages/admin/pages/index";

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
        <Route path="/user/transactions" element={<Transactions />} />
        {/* Admin router Paths*/}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/games" element={<Games />} />
        <Route path="/admin/games/add" element={<NewGame />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
