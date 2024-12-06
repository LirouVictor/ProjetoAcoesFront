import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Paginas/Home/Home'
import './App.css'
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import AreaLogada from './Paginas/AreaLogada/Home/AreaLogada'
import PagedList from "./Componentes/PagedList/PagedList";
import CardInfo from "./Paginas/AreaLogada/CardInfo/CardInfo";
import SymbolForm from "./Paginas/AreaLogada/SymbolForm/SymbolForm";
import { SymbolProvider } from "./Context/SymbolContext";
import SymbolsList from "./Paginas/AreaLogada/SymbolDataDisplay/SymbolsList";

const App = () => {
  return (
    <SymbolProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroUsuarios" element={<CadastroUsuario />} />
          <Route path="/Home/AreaLogada" element={<AreaLogada />} />
          <Route path="/AcoesGerais" element={<PagedList />} />
          <Route path="/acao/:symbol" element={<CardInfo />} />
          <Route path="/CadastroSymbols" element={<SymbolForm />} />
          <Route path="/SymbolsList" element={<SymbolsList />} />
        </Routes>
      </Router>
    </SymbolProvider>
  );
}

export default App
