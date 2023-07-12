import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// const tick = () => {
//   const elem = (
//     <div>
//       <h1>
//         hello 
//       </h1>

//       <h2>
//         the time is : {new Date().toLocaleTimeString()}
//       </h2>

//     </div>
//   )
// }

// setInterval(()=>{
//   tick();
// } , 1000);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>
  
);


reportWebVitals();




// ReactDOM.render(elem  , document.getElementById('root'));