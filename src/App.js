import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import {Home} from "./Components/Home";
import {Login} from "./Components/Login";
import {Book} from "./Components/Book";
import {Navbar} from "./Components/Navbar";
import {Register} from "./Components/Register";
import {NotFound} from "./Components/NotFound";
import {RequireAuth} from "./Components/RequireAuth";

function App() {
  return (
      <>
          <Routes>
              <Route element={<RequireAuth/>}>
                  <Route element={<Navbar/>}>
                      <Route path="/" element={<Home />} />
                      <Route path="/book/:id" element={<Book />}/>
                  </Route>
              </Route>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register/>}/>
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
}

export default App;
