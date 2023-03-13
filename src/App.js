import { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Getstarted from "./components/Getstarted";
import Codecompletion from "./pages/Codecompletion";
import Home from "./pages/Home";
import Mainpage from "./pages/Mainpage";
import { code_reducer, initialState } from "./reducer/Codereducer";
import { BrowserRouter } from "react-router-dom";
export const Codecontext = createContext();

function App() {
  const [state, dispatch] = useReducer(code_reducer, initialState);
  return (
    <Codecontext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getStarted" element={<Getstarted />} />
          <Route path="/mainPage" element={<Mainpage />} />
          <Route path="/codeCompletion" element={<Codecompletion />} />
        </Routes>
      </BrowserRouter>
    </Codecontext.Provider>
  );
}

export default App;
