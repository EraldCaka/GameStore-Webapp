import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Register, Landing, Error } from "./pages";
import {
  UserHomePage,
  Library,
  Store,
  Wishlist,
  Account,
} from "./pages/user/index";
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
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
