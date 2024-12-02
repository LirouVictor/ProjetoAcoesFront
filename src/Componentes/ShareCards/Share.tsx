import { ShareCardProps } from '../../Interfaces/ShareCardProps';
import './Share.css'; 

const Share: React.FC<ShareCardProps> = ({ logoUrl, shortName, symbol, regularMarketPrice }) => {
    return (
        <>
            <div className="container-share"> 
                <h2 className="share-name">{shortName}</h2>
                <img src={logoUrl} className="share-card__image" alt="Share logo" />
                <div className="submenu-share">
                    <div className="titulos-share">
                        <span className="campos-share">Símbolo: </span>
                        <span className="campos2-share">{symbol}</span>
                    </div>
                    <div className="titulos-share">
                        <span className="campos-share">Preço: </span>
                        <span className="campos2-share">{regularMarketPrice}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Share;