import React from "react";
import styled from "styled-components";
import { GenerationProps } from "./Lens.types";
import { ParameterProps } from "../Generator/Generator.types";

import { ObjectsContext } from "../../context/ObjectsContextProvider";

const PlotLensContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding-right: 4px;
    width: 100%;
    height: 100%;
`;

const PlotContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Plot = styled.div`
    flex: 1;
    position: relative;
    border-left: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
`;

const Dot = styled.div<{x: number, y: number, selected: boolean, viewed: boolean}>`
    position: absolute;
    top: ${({y}) => y}%;
    left: ${({x}) => x}%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({viewed}) => viewed ? "#aaaaaa99" : "#0088ff99"};
    cursor: pointer;
    ${({selected}) => selected && `
    width: 16px;
    height: 16px;
    margin-left: -4px;
    margin-top: -4px;
    background-color: #0088ff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    `}
    &:hover {
        width: 16px;
        height: 16px;
        margin-left: -4px;
        margin-top: -4px;
        background-color: #0088ff;
        box-shadow: 0p