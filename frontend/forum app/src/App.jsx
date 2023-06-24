import React, { useState } from 'react';
import './App.css'

//import react router dom
import {Route, Routes,useNavigate } from 'react-router-dom'

//user context
import { UserContextProvider } from './context/context';

//importing from compounents directory
import { Header,Wrapper } from './compounts';

// import from pages directory
import { Home,SignUp,Login } from './pages';
function App() {
  const [user,setUser] = useState('');
  const navigate = useNavigate();
  return (
    <>
    <UserContextProvider>
      <Header />
      <Wrapper>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Wrapper>
    </UserContextProvider>
  </>
  )
}

export default App