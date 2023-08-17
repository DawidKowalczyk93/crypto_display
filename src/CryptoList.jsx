import './styles/_cryptoList.scss';


const CryptoList = ({children}) => {
    return (
        <div className='crypto__list'>
            {children}
        </div>
    )
};

export default CryptoList
