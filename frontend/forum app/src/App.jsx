import React, { useState } from 'react';
import './App.css'

//import react router dom
import {Route, Routes,useNavigate } from 'react-router-dom'

//user context
import { UserContextProvider } from './context/context';

//importing from compounents directory
import { Header,Wrapper } from './compounts';

import { useContext } from 'react';
import { userContext } from './context/context';
// import from pages directory
import { Home,SignUp,Login,CreatePost,SinglePostInfo,Profile } from './pages';
function App() {
  const {data} = useContext(userContext);

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
          <Route path='/CreatePost' element={<CreatePost />} />
          <Route path='/post/:id' element={<SinglePostInfo />} />
          <Route path='/profile/:user' element={<Profile />}/>
        </Routes>
      </Wrapper>
    </UserContextProvider>
  </>
  )
}

export default App