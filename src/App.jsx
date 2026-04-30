import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import PaymentForm from './components/pages/PaymentForm'
import Header from './components/reusable/Header'

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />
        <main className="min-h-screen bg-gray-800 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentForm />} />
          </Routes>
        </main>
      </BrowserRouter>

    </>
  )
}

export default App
