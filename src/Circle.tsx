import styled from "styled-components"
import { getJSDocOverrideTagNoCache } from "typescript";
//import { useState } from "react";
import React, { useState } from 'react';

interface ContainerProps {
    bgColor:string;
    borderColor?:string;
}

const Container = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color: ${props => props.bgColor};
    border: 2px solid ${props => props.borderColor ?? "blue"}
    border-radius:50;
`;

interface PlayerShape{
  name?:string;
  age:number;
};
  
const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name ?? "aaa"}!
    your age is ${playerObj.age}.`;


interface CircleProps {
    bgColor:string;
    borderColor?:string;
    text?:string;
}

function Circle({bgColor,borderColor,text ="hey"}:CircleProps)
{
    const [counter, setCounter] = useState<number|boolean|string>(2);
    setCounter("true");
    return <Container bgColor={bgColor} borderColor={borderColor}>{sayHello({age:21})} {text ?? "default"}</Container>
}

export default Circle;