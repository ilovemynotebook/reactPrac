import {BrowserRouter, Switch, Route} from "react-router-dom";
import { isPropertySignature } from "typescript";
import Coin from "./routes/coin";
import Coins from "./routes/coins";


function Router(){
    return <BrowserRouter>
        <Switch>
            <Route path="/reactPrac/:coinId">
                <Coin />
            </Route>
            <Route path="/reactPrac/">
                <Coins />
            </Route>
        </Switch>
    </BrowserRouter>
}
export default Router;