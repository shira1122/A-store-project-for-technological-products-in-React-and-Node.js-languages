import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import AuthPage from './Components/user/AuthPage';
import CategoryPage from './Components/product/CategoryPage';
import { CartProvider } from './Components/Order/CartContext';
import Orders from './Components/Order/OrdersPage';


function App() {
  const user = useSelector((state) => state.user.userInfo);
  const adminEmail = "admin@email.com"; 
const adminPassword=1111;
  return (
    <CartProvider>
      <div className="App">

        {!user && <AuthPage />}
        
        {user && user.email === adminEmail &&<CategoryPage />}
        {user && user.email !== adminEmail && <Orders/>}
      </div>
    </CartProvider>
  );
}

export default App;