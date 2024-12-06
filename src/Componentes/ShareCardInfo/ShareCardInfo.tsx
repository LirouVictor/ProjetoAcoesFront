import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { FetchShareBySymbol } from '../../Servicos/MercadoFacilAPI'; 
import './ShareCardInfo.css'

const ShareDetails: React.FC = () => {
    const { symbol } = useParams(); 
    const navigate = useNavigate();
    const [shareData, setShareData] = useState<any>(null); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchShare = async () => {
            if (symbol) {
                try {
                    const data = await FetchShareBySymbol(symbol); 
                    setShareData(data); 
                } catch (error) {
                    console.error('Erro ao buscar dados da ação:', error);
                } finally {
                    setLoading(false); 
                }
            }
        };
        
        fetchShare();
    }, [symbol]);

    if (loading) {
        return (
            <div>Carregando...</div>
        );
    }

    if (!shareData) {
        return <div>Ação não encontrada.</div>;
    }

    const goToMenu = () => {
        navigate('/Home/AreaLogada'); 
    };

    return (
        <div className="share-details-container">
        <div className="share-header">
            <div className="share-header-content">
                <img src={shareData.logourl} alt={`${shareData.shortName} logo`} className="share-logo" />
                <div className="share-info">
                    <h1 className="share-name">{shareData.shortName}</h1>
                    <p className="share-symbol">{shareData.symbol}</p>
                </div>
            </div>
        </div>
    
        <div className="share-body">
            <div className="share-left-column">
                <div className="stat">
                    <p><strong>Preço Atual:</strong> {shareData.regularMarketPrice}</p>
                    <p><strong>Variação do Dia:</strong> {shareData.regularMarketChange} ({shareData.regularMarketChangePercent}%)</p>
                    <p><strong>Máxima do Dia:</strong> {shareData.regularMarketDayHigh}</p>
                    <p><strong>Mínima do Dia:</strong> {shareData.regularMarketDayLow}</p>
                    <p><strong>Variação do Preço:</strong> {shareData.regularMarketRange}</p>
                </div>
                <div className="stat">
                    <p><strong>Capitalização de Mercado:</strong> {shareData.marketCap}</p>
                    <p><strong>Volume de Negociação:</strong> {shareData.regularMarketVolume}</p>
                    <p><strong>Volume Médio (3 meses):</strong> {shareData.averageDailyVolume3Month}</p>
                    <p><strong>Volume Médio (10 dias):</strong> {shareData.averageDailyVolume10Day}</p>
                </div>
            </div>
            
            <div className="share-right-column">
                <div className="stat">
                    <p><strong>Preço/Lucro:</strong> {shareData.priceEarnings}</p>
                    <p><strong>Lucro por Ação:</strong> {shareData.earningsPerShare}</p>
                    <p><strong>52 Semanas - Máxima/Minima:</strong> {shareData.fiftyTwoWeekRange}</p>
                    <p><strong>Variação da Máxima de 52 semanas:</strong> {shareData.fiftyTwoWeekHighChange} ({shareData.fiftyTwoWeekHighChangePercent}%)</p>
                    <p><strong>Variação da Mínima de 52 semanas:</strong> {shareData.fiftyTwoWeekLowChange} ({shareData.fiftyTwoWeekLowChangePercent}%)</p>
                </div>
                <div className="stat">
                    <p><strong>Variação dos Últimos 200 Dias:</strong> {shareData.twoHundredDayAverageChange} ({shareData.twoHundredDayAverageChangePercent}%)</p>
                    <p><strong>Máxima dos Últimos 52 Semanas:</strong> {shareData.fiftyTwoWeekHigh}</p>
                    <p><strong>Mínima dos Últimos 52 Semanas:</strong> {shareData.fiftyTwoWeekLow}</p>
                </div>
            </div>
        </div>
    
        <div className="share-footer">
            <div className="share-buttons">
                <button onClick={goToMenu}>Outras Ações</button>
            </div>
        </div>
    </div>
    );    
};

export default ShareDetails;
