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
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    height: 100%;
    width: 0;
`;

const InfoSection = styled.div`
    display: flex;
    padding: 8px;
    border-radius: 8px;
    font-size: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    gap: 4px;
    flex-direction: column;
    overflow-y: auto;
`;

const InfoContent = styled.div`
    font-size: 12px;
    overflow-y: auto;
    flex: 1;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 4px;
    }
`;

const YAxis = styled.div`
    height: 100%;
    color: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    & > span {
        transform: rotate(180deg);
        writing-mode: tb-rl;
    }
`;

const XAxis = styled.div`
    width: 100%;
    color: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
`;

const SelectorContainer = styled.div`
    display: flex;
    gap: 4px;
    font-size: 12px;
    color: #999;
    width: 100%;

    & > select {
        flex: 1;
        font-size: 12px;
        border: solid 1px #cccccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

const AnimationContainer = styled.svg`
    position: absolute;
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    height: 48px;
    width: 48px;
    z-index: 2;
`;

const parametersToHtml = (properties: ParameterProps[]) => {
    return properties.map(