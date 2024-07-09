import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignInComponent } from "./pages/login/login";
import { Router } from "./pages/Router";
import { Register } from "./pages/Register/Register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignInComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pages/*" element={<Router />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
