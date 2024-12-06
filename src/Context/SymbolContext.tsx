import React, { createContext, useContext, useState, useEffect } from "react";

type SymbolContextType = {
    symbols: string[];
    addSymbol: (symbol: string) => void;
    removeSymbol: (index: number) => void;
};

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const useSymbolContext = () => {
    const context = useContext(SymbolContext);
    if (!context) {
        throw new Error("useSymbolContext must be used within a SymbolProvider");
    }
    return context;
};

export const SymbolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [symbols, setSymbols] = useState<string[]>(() => {
        const storedSymbols = localStorage.getItem("symbols");
        return storedSymbols ? JSON.parse(storedSymbols) : [];
    });

    useEffect(() => {
        localStorage.setItem("symbols", JSON.stringify(symbols));
    }, [symbols]);

    const addSymbol = (symbol: string) => {
        setSymbols((prev) => [...prev, symbol]);
    };

    const removeSymbol = (index: number) => {
        setSymbols((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <SymbolContext.Provider value={{ symbols, addSymbol, removeSymbol }}>
            {children}
        </SymbolContext.Provider>
    );
};
