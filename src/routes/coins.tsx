import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color:white;
    color:${props => props.theme.bgColor};
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: background-color 0.2s ease-in;
    display: flex;
    align-items: center;
    &:hover {
            background-color:${props => props.theme.accentColor};
    }
`;//만약 글자라면, display:block의 경우 예를 감싼녀석 전체가 hover영향됨.
//만약 클릭까지 하게 하고 싶다면, padding을 넓게
//근데 그럴꺼까지 없고 그냥 판넬 전체를 링크걸면 됨

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align:center;
    display: block;
`

interface ICoins {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

const Img = styled.img`
    width:25px;
    height:25px;
    margin-right: 10px;
`;

function Coins() {

    const { isLoading, data } = useQuery<ICoins[]>("allcoins",fetchCoins)


    const [coins,SetCoins] = useState<ICoins[]>([]);
    const [loading,SetLoading] = useState(true);
    useEffect(() => {
        (async() => {
            let json = await(await fetch("https://api.coinpaprika.com/v1/coins")).json();
            SetCoins(json.slice(0,100));
            SetLoading(false);
        })()
    },[])






    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? <Loader>Loading... please wait a sec!</Loader> : <CoinsList>
            {data?.slice(0,100).map(coin => 
                <Link to={{
                    pathname: `/reactPrac/${coin.id}`,
                    state: {name:coin.name}
                }} key={coin.id}>
                    <Coin>
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                        {coin.name} &rarr;
                    </Coin>
                </Link>
            )}
        </CoinsList>}
    </Container>
}
export default Coins;