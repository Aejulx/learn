
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from "./component/Auth/Login";
// import Home from './component/pages/Home';

// // taskitem mai kamm karna hai
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login123 from "./component/Auth/Login123"
import StudentPage from './component/pages/StudentPage';
import Home from './component/pages/Home';
import Admin from './component/pages/Admin';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login123 />} />
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
};

export default App;

