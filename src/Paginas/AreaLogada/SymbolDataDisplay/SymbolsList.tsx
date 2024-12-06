import React, { useEffect, useState } from 'react';
import { useSymbolContext } from './../../../Context/SymbolContext';
import { FetchShareBySymbol } from './../../../Servicos/MercadoFacilAPI'; 
import Share from '../../../Componentes/ShareCards/Share';
import './SymbolsList.css'; 
import Sidebar from '../../../Componentes/Sidebar/Sidebar';

const SymbolsList: React.FC = () => {
    const { symbols } = useSymbolContext(); 
    const [shareData, setShareData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            const fetchedShares = [];
            for (const symbol of symbols) {
                try {
                    const share = await FetchShareBySymbol(symbol);
                    fetchedShares.push(share);
                } catch (error) {
                    console.error(`Erro ao buscar dados para o symbol ${symbol}:`, error);
                }
            }
            setShareData(fetchedShares);
            setLoading(false);
        };

        fetchShares();
    }, [symbols]);

    return (
        <div className="symbol-form-page">
            <Sidebar /> 
        <div className="symbols-list-container">
            <h2>Lista de Ações Favoritas</h2>
            {loading ? (
                <div className="loading">Carregando...</div>
            ) : shareData.length > 0 ? (
                <div className="cards-container">
                    {shareData.map((share, index) => (
                        <Share
                            key={index}
                            logoUrl={share.logourl}
                            shortName={share.shortName}
                            symbol={share.symbol}
                            regularMarketPrice={share.regularMarketPrice}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-data">Nenhum dado disponível para as ações cadastradas</p>
            )}
        </div>
        </div>
    );
};

export default SymbolsList;
