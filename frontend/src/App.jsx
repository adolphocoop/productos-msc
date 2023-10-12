import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import  ProtectedRoute   from './ProtectedRoute'
import { ProductsProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
       <BrowserRouter>
       
       <main className="container mx-auto px-10">

       <Navbar></Navbar>
    <Routes>
      <Route path='/' element = {<HomePage />}/>
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/register' element = {<RegisterPage/>}/>
      
      <Route element={<ProtectedRoute/>}>
      <Route path='/profile' element = {<ProfilePage />}/>
      <Route path='/products' element = {< ProductsPage />}/>
      <Route path='/add-product' element = {< ProductsFormPage />}/>
      <Route path='/product/:id' element = {< ProductsFormPage />}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </main>
    </BrowserRouter>
    </ProductsProvider>
    </AuthProvider>
   
  )
}

export default App