import MarketPage from '../../../Componentes/PagedList/PagedList';
import Sidebar from '../../../Componentes/Sidebar/Sidebar'; // Ajuste o caminho conforme sua estrutura
import './AreaLogada.css';

const Home = () => {
    return (
        <div className="home-container">
            <Sidebar /> 
            <div className="home-content">
                <MarketPage />
            </div>
        </div>
    );
};

export default Home;
