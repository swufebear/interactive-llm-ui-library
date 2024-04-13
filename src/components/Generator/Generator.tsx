import React from "react";
import styled from "styled-components";
import { GeneratorProps, ParameterProps } from "./Generator.types";
import { ObjectsContext } from "../../context/ObjectsContextProvider";

const ParameterRow = styled.div<{ size: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(props) => props.size === "small" ? "4px" : (props.size === "medium" ? "6px" : "8px")};
    margin-top: ${(props) => props.size === "small" ? "4px" : (props.size === "medium" ? "6px" : "8px")};
`;

const ParameterBlock = styled.div<{ size: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.50);
    border-radius: ${(props) => props.size === "small" ? "2px" : (props.size == "medium" ? "4px" : "6px")};
    height: ${(props) => props.size === "small" ? "32px" : (props.size == "medium" ? "48px" : "64px")};
    width: ${(props) => props.size === "small" ? "32px" : (props.size == "medium" ? "48px" : "64px")};
    padding: ${(props) => props.size === "small" ? "0 2px 2px 2px" : (props.size == "medium" ? "0 3px 3px 3px" : "0 4px 4px 4px")};
    cursor: pointer;
    &:hover {
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
`;

const ParameterName = styled.div<{ size: string }>`
    font-size: ${(props) => props.size === "small" ? "8px" : (props.size === "medium" ? "12px" : "16px")};
    color: #555555;
    margin-bottom: 2px;
`;

const ParameterValue = styled.div<{ size: string }>`
    font-size: ${(props) => props.size === "small" ? "16px" : (props.size === "medium" ? "20px" : "24px")};
    width: 90%;
    text-align: center;
    color: #333333;
    background-color: rgba(255, 255, 255, 0.75);
    flex: 1;
    border-radius: ${(props) => props.size === "small" ? "2px" : (props.size == "medium" ? "3px" : "4px")};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Parameter: React.FC<ParameterProps & { size: string; onClick: (e: any) => void }> = ({
    id,
    name,
    nickname,
    type,
    value,
    allowedValues,
    valueNicknames,
    defaultValue,
    size,
    onClick
}) => {
    if(type === "nominal") {
        value = valueNicknames ? valueNicknames[value as string] : value;
    }

    return (
        <ParameterBlock size={size} onClick={onClick}>
            <ParameterName size={size}>
                {nickname ? nickname : name.toLowerCase()}
            </ParameterName>
            <ParameterValue size={size}>
                {value}
            </ParameterValue>
        </ParameterBlock>
    )
}

const ControllerContainer = styled.div<{ size: string, row: number, column: number, color: string }>`
    position: absolute;
    top: ${(props) => props.size === "small" ? 12 + props.row*(34 + 4) : (props.size === "medium" ? 17 + props.row*(51 + 6) : 22 + props.row*(68 + 8))}px;
    left: ${(props) => props.size === "small" ? 4 + props.column*(36 + 4) : (props.size == "medium" ? 6 + props.column*(54 + 6) : 8 + props.column*(72 + 8))}px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: ${(props) => props.size === "small" ? "2px" : (props.size == "medium" ? "4px" : "6px")};
    height: ${(props) => props.size === "small" ? "34px" : (props.size == "medium" ? "51px" : "68px")};
    width: ${(props) => props.size === "small" ? "120px" : (props.size == "medium" ? "180px" : "220px")};
    border: solid ${(props) => props.color} ${(props) => props.size === "small" ? "1px" : "2px"};
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    font-size: ${(props) => props.size === "small" ? "10px" : (props.size === "medium" ? "16px" : "20px")};
    text-align: left;
    cursor: pointer;
    z-index: 3;
`;

const ControllerInner = styled.div<{size: string, filled?: number}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - ${(props) => props.size === "small" ? "8px" : (props.size === "medium" ? "16px" : "24px")});
    padding: ${(props) => props.size === "small" ? "0 4px" : (props.size == "medium" ? "0 8px" : "0 12px")};

    & > input[type=text] {
        font-size: ${(props) => props.size === "small" ? "10px" : (props.size == "medium" ? "14px" : "18px")};
        width: 20%;
        text-align: center;
        border: solid 1px #cccccc;
        border-radius: 4px;
    }

    & > input[type=range] {
        width: 100%;
        -webkit-appearance: none;
        padding-top: ${(props) => props.size === "small" ? "2px" : (props.size === "medium" ? "4px" : "6px")};
    }
    & > input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: ${(props) => props.size === "small" ? "8px" : (props.size === "medium" ? "12px" : "16px")};
        height: ${(props) => props.size === "small