import React, { useState } from "react";
import { useSymbolContext } from "./../../../Context/SymbolContext";
import Sidebar from "../../../Componentes/Sidebar/Sidebar";  // Importe o Sidebar
import "./SymbolForm.css";

const SymbolForm: React.FC = () => {
    const { symbols, addSymbol, removeSymbol } = useSymbolContext(); // Usa o contexto
    const [symbol, setSymbol] = useState("");

    const handleAddSymbol = (e: React.FormEvent) => {
        e.preventDefault();
        if (symbol.trim() === "") return;
        addSymbol(symbol.trim()); // Adiciona ao contexto
        setSymbol("");
    };

    return (
        <div className="symbol-form-page">
            <Sidebar /> {/* Aqui você inclui o Sidebar */}

            <div className="symbol-form-content">
                <h2>Cadastro de Ações</h2>
                <form className="symbol-form" onSubmit={handleAddSymbol}>
                    <input
                        type="text"
                        placeholder="Digite o symbol da ação"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="symbol-input"
                    />
                    <button type="submit" className="add-button">Adicionar</button>
                </form>
                <div className="symbols-list">
                    <h3>Ações Cadastrados</h3>
                    {symbols.length > 0 ? (
                        <ul>
                            {symbols.map((s, index) => (
                                <li key={index} className="symbol-item">
                                    {s}
                                    <button
                                        className="delete-button"
                                        onClick={() => removeSymbol(index)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-list">Nenhuma ação cadastrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymbolForm;
