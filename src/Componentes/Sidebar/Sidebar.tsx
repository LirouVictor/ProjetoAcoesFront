import React from "react";
import { Link } from "react-router-dom"; 
import "./Sidebar.css";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="menu">
                <div className="menu-item">
                    <Link to="/Home/AreaLogada">
                        <i className="icon fa fa-chart-line"></i>
                        <span className="menu-text">Ações em Geral</span>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to="/SymbolsList">
                        <i className="icon fa fa-star"></i>
                        <span className="menu-text">Ações Favoritas</span>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to="/CadastroSymbols">
                        <i className="icon fa fa-plus-circle"></i>
                        <span className="menu-text">Acompanhar Ações</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
