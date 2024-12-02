import React, { useEffect, useState } from 'react';
import Share from "../ShareCards/Share";
import { FetchShareListPaged } from "../../Servicos/MercadoFacilAPI";
import { useNavigate } from 'react-router-dom'; // Verifique se está importado corretamente
import './PagedList.css'

const PagedList: React.FC = () => {
    const [shares, setShares] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [resultsPerPage] = useState(6); // 6 resultados por página
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const [loading, setLoading] = useState(true);

    const maxVisiblePages = 10; // Número máximo de páginas visíveis

    useEffect(() => {
        const fetchShares = async () => {
            try {
                setLoading(true); // Inicia o carregamento
                const response = await FetchShareListPaged(page, resultsPerPage);
                console.log(response); // Verifica se a resposta contém os dados esperados
                setShares(response.items); // Atualiza o estado com os itens
                setTotalPages(response.totalPages); // Atualiza o total de páginas
            } catch (error) {
                console.error('Erro ao carregar ações: ', error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchShares();
    }, [page, resultsPerPage]);

    const navigate = useNavigate();
    
    const handleShareClick = (symbol: string) => {
        // Navega para a página de detalhes da ação, usando o símbolo como parâmetro
        navigate(`/acao/${symbol}`);
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handlePreviousGroup = () => {
        if (page > 1) setPage((prevPage) => Math.max(1, prevPage - maxVisiblePages));
    };

    const handleNextGroup = () => {
        if (page < totalPages) setPage((prevPage) => Math.min(totalPages, prevPage + maxVisiblePages));
    };

    // Calcula o intervalo das páginas visíveis
    const startPage = Math.floor((page - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                ) : shares.length > 0 ? (
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row">
                            {shares.slice(0, 6).map((share) => (
                                <div className="col-4 col-sm-6 col-md-4 card-spacing" key={share.id}>
                                    <button
                                        className="card-button"
                                        onClick={() => handleShareClick(share.symbol)} // Ação ao clicar
                                        style={{ width: '100%', height: '100%', border: 'none', background: 'none' }} 
                                    >
                                        <Share
                                            logoUrl={share.logourl}
                                            shortName={share.shortName}
                                            symbol={share.symbol}
                                            regularMarketPrice={share.regularMarketPrice}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Sem ações disponíveis.</p>
                )}
            </div>

            {/* Paginação Numerada */}
            <div className="pagination">
                {/* Botão para Voltar Grupo */}
                <button
                    onClick={handlePreviousGroup}
                    disabled={page <= maxVisiblePages || loading}
                    className="page-button"
                >
                    &laquo;
                </button>

                {/* Números das Páginas Visíveis */}
                {visiblePages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`page-button ${page === pageNumber ? 'active' : ''}`}
                        disabled={loading}
                    >
                        {pageNumber}
                    </button>
                ))}

                {/* Botão para Avançar Grupo */}
                <button
                    onClick={handleNextGroup}
                    disabled={endPage >= totalPages || loading}
                    className="page-button"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
};

export default PagedList;
