import { Switch, Route ,useParams, useLocation } from "react-router"
import { Link, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import { useState,useEffect } from "react"
import { json } from "stream/consumers";
import { isPrivateIdentifier } from "typescript";
import Prices from "./Prices";
import { Chart } from "./Chart";
import { useQuery } from "react-query";
import { coinInfo, coinPrice } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
`;

const Loader = styled.span`
    text-align:center;
    display: block;
`

const Title = styled.h1`
    display:flex;
    font-size: 100px;
    justify-content:center;
    color:${props => props.theme.accentColor};
`;

const Overview = styled.div`
    height:100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(19, 15, 64,1.0);
    border-radius: 10px;
    padding: 20px 20px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size:10px;
        font-weight: 400;

    }
    span:last-child {
        font-size:30px;
        font-weight: 400;

    }
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    
    text-align: center;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    background-color: rgba(19, 15, 64,1.0);
    padding: 7px 0px;
    border-radius: 10px;
    display:block;
    background-color: ${props => props.isActive ? props.theme.accentColor : null};
`;

interface RouteParams {
    coinId:string
}

interface RouteState {
    name:string,
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceDate {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    //const {coinId} = useParams<{coinId:string}>();
    const { state } = useLocation<RouteState>();
    //const {state: {name}} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price")
    const chartMatch = useRouteMatch("/:coinId/chart")

    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info",coinId], () => coinInfo(coinId));
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceDate>(["price",coinId], () => coinPrice(coinId));
    
    /*
    
    const [info,setInfo] = useState<IInfoData>();
    const [price,setPrice] = useState<IPriceDate>();
    
    useEffect(() =>{
        (async()=> {
            const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPrice(priceData);
            setLoading(false);
            }
        )();
    },[coinId]);*/


    const loading = infoLoading || priceLoading;
    return <Container>
        <Header>
            <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        </Header>
    {loading ? 
        <Loader>Loading... please wait a sec!</Loader> : 
        <>
            <Overview>
                <OverviewItem>
                    <span>RANK:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>SYMBOL:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>OPEN SOURCE</span>
                    <span>{infoData?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <div style={{padding:20, fontSize:20}}>{infoData?.description}</div>
            <Overview>
                <OverviewItem>
                    <span>TOTAL SUPPLY:</span>
                    <span>{priceData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>MAX SUPPLY</span>
                    <span>{priceData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Tabs>
                <Link to={`/${coinId}/price`}>
                    <Tab isActive={priceMatch !== null}>Price</Tab>
                </Link>
                <Link to={`/${coinId}/chart`}>
                    <Tab isActive={chartMatch !== null}>Chart</Tab>
                </Link>
            </Tabs>

            <Switch>
                <Route path={`/:coinId/price`}>
                    <Prices />
                </Route>
                <Route path={`/:coinId/chart`}>
                    <Chart coinId={coinId}/>
                </Route>
            </Switch>
        </>
    }
    </Container>
}
export default Coin;