import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Register, Landing, Error } from "./pages";
import { UserHomePage } from "./pages/user/index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<UserHomePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
