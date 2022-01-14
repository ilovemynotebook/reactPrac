import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: string;
    time_close: string; 
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface chartProps{
    coinId:string

};

export function Chart({ coinId }:chartProps){
    const isDark = useRecoilValue(isDarkAtom)
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],() =>fetchCoinHistory(coinId));
    return <h1>{isLoading ? "Loading..." : 
        <ApexChart 
            type="line"
            series={[//이 배열은 라인을 의미. 라인 안의 값들은 2차원 배열
                {
                    name: "price",
                    data: data?.map(price => price.close)
                }
            ]}
            options= {{
                theme:{
                    mode: isDark ? "dark" : "light"
                },
                chart: {
                    height: 400,
                    width: 400,
                    toolbar : {
                        show: false
                    },
                    background:"transparent",
                },
                grid:{show:false},
                yaxis:{
                    show:false
                },
                xaxis:{
                    labels:{show:false},
                    axisTicks:{show:false},
                    axisBorder:{show:false},
                    type: "datetime",
                    categories: data?.map(price=>price.time_close)
                },
                stroke: {
                    curve: "smooth",
                    width: 3
                },
                fill: { type: "gradient", gradient:{gradientToColors:["blue","yellow"], stops:[30,50,70]}},
                colors :["green"],
                tooltip: {
                    y: {
                        formatter: (value)=> `$${value.toFixed(3)}`,
                    }
                }
            }}
        />}</h1>
}
