import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbars from "./Components/Navbars";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Studentdetails from "./Components/Studentdetails";
import Staffdetails from "./Components/Staffdetails";
import About from "./Components/About";
import Addstudent from "./Components/Addstudent";
import Addstaff from "./Components/Addstaff";

function App() {
  return (
    <>
      <Router>
        <Navbars />

        <Routes>
          <Route path="/" element = { <Home/> } />
          <Route path="/details" element = { <Details/> } >
          <Route path="staffdetails" element={ <Staffdetails/>  } />
          <Route path="studentdetails" element={ <Studentdetails/>  } />
          <Route path="addstaff" element={ <Addstaff/> } />
          <Route path="addstudent" element={ <Addstudent/>  } />
         
         </Route>
        
          <Route path="/addstaff" element={ <Addstaff/>} />
          <Route path="/addstudent" element={ <Addstudent/>} />
          <Route path="/about"  element = { <About/> }/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
