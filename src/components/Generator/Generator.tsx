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
        height: ${(props) => props.size === "small" ? "8px" : (props.size === "medium" ? "12px" : "16px")};
        border-radius: 50%;
        background-color: #0066ffdd;
        cursor: pointer;
        transition: 0.5s;
        margin-top: ${(props) => props.size === "small" ? "-2px" : (props.size === "medium" ? "-3px" : "-4px")};
        &:hover {
            background-color: #0066ff;
        }
    }
    & > input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        height: ${(props) => props.size === "small" ? "4px" : (props.size === "medium" ? "6px" : "8px")};
        border-radius: 20px;
        width: 100%;
        background: #dddddd;
        background-image: linear-gradient(#0066ffaa, #0066ffaa);
        background-size: ${(props) => props.filled}% 100%;
        background-repeat: no-repeat;
    }
    & > select {
        width: 100%;
        font-size: ${(props) => props.size === "small" ? "10px" : (props.size == "medium" ? "14px" : "18px")};
        border: solid 1px #cccccc;
        border-radius: 4px;
    }
`;

const ParameterController: React.FC<{ parameter: ParameterProps, size: string, row: number, column: number, color: string, changeHandler: (value: string | number) => void }> = ({
    parameter,
    size,
    row,
    column,
    color,
    changeHandler
}) => {
    const [currInput, setCurrInput] = React.useState<string>(parameter.value !== undefined && typeof parameter.value !== "string" ? parameter.value.toString() : "");
    
    React.useEffect(() => {
        setCurrInput(parameter.value !== undefined && typeof parameter.value !== "string" ? parameter.value.toString() : "");
    }, [parameter.value]);

    const handleChange = () => {
        var inputFloat = parseFloat(currInput);
        if(isNaN(inputFloat)) {
            setCurrInput(parameter.value && typeof parameter.value !== "string" ? parameter.value.toString() : "");
            return;
        }

        var allowedValues = parameter.allowedValues as number[];
        if(inputFloat > allowedValues[1]) {
            inputFloat = allowedValues[1];
        } else if(inputFloat < allowedValues[0]) {
            inputFloat = allowedValues[0];
        }

        if(parameter.type === "discrete") {
            inputFloat = Math.round(inputFloat);
        }

        changeHandler(inputFloat);
    }

    var filled = 0;
    if(parameter.type !== "nominal") {
        filled = parameter.value as number / ((parameter.allowedValues[1] as number) - (parameter.allowedValues[0] as number)) * 100;
    }

    return (
        <ControllerContainer size={size} row={row} column={column} color={color}>
            <ControllerInner size={size} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                <div>{parameter.name.slice(0, 12)}</div>
                {parameter.type !== "nominal" ? 
                    <input 
                        value={currInput} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrInput(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key == "Enter" && handleChange()}
                        onBlur={handleChange}
                        type="text"
                    /> :
                    ""
                }
            </ControllerInner>
            <ControllerInner size={size} filled={filled} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                {parameter.type !== "nominal" ? 
                    <input 
                        type="range" 
                        min={parameter.allowedValues[0]}
                        max={parameter.allowedValues[1]}
                        value={parameter.value}
                        step={parameter.type == "discrete" ? 1 : 0.05}
                        onChange={(e: any) => changeHandler(parseFloat(e.target.value))}
                    /> :
                    <select defaultValue={parameter.value} onChange={(e: any) => changeHandler(e.target.value)}>
                        {parameter.allowedValues.map((value, index) => {
                            return (
                                <option key={index} value={value}>{value}</option>
                            )
                        })}
                    </select>
                }
            </ControllerInner>
        </ControllerContainer>
    )
};

const GeneratorContainer = styled.div<{ color: string, size: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.color};
    border-radius: ${(props) => props.size === "small" ? "4px" : (props.size == "medium" ? "6px" : "8px")};
    padding: ${(props) => props.size === "small" ? "2px 4px 4px 4px" : (props.size == "medium" ? "3px 6px 6px 6px" : "4px 8px 8px 8px")};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    width: fit-content;
    height: fit-content;
    position: relative;
    cursor: pointer;
`;

const GeneratorHeader = styled.div<{ size: string }>`
    font-size: ${(props) => props.size === "small" ? "8px" : (props.size === "medium" ? "12px" : "16px")};
    line-height: 1;
    color: white;
    user-select: none;
`;

const AnimationContainer = styled.svg<{ size: string }>`
    position: absolute;
    top: calc(50% - ${(props) => props.size === "small" ? "16px" : (props.size == "medium" ? "24px" : "32px")});
    left: calc(50% - ${(props) => props.size === "small" ? "16px" : (props.size == "medium" ? "24px" : "32px")});
    height: ${(props) => props.size === "small" ? "32px" : (props.size == "medium" ? "48px" : "64px")};
    width: ${(props) => props.size === "small" ? "32px" : (props.size == "medium" ? "48px" : "64px")};
    z-index: 2;
`;

const Outline = styled.div<{ size: string }>`
    position: absolute;
    top: -${(props) => props.size !== "large" ? 4 : 6}px;
    left: -${(props) => props.size !== "large" ? 4 : 6}px;
    height: calc(100% + ${(props) => props.size !== "large" ? 8 : 12}px);
    width: calc(100% + ${(props) => props.size !== "large" ? 8 : 12}px);
    border: solid rgb(0, 194, 255) ${(props) => props.size !== "large" ? 2 : 3}px;
    border-radius: ${(props) => props.size === "small" ? 6 : (props.size == "medium" ? 8 : 10)}px;
    box-sizing: border-box;
    box-shadow: 0 0 2px 2px rgba(0, 194, 255, 0.3);
`;

const Generator: React.FC<GeneratorProps> = ({ 
    id,
    parameters,
    color,
    size,
    numColumns,
    isGenerating,
    isSelected,
    onMouseEnter,
    onMouseLeave
}) => {
    const { updateGenerator, toggleGenerator, onGenerate } = React.useContext(ObjectsContext);
    const [selectedParameter, setSelectedParameter] = React.useState<string>("");
    const clickTimer = React.useRef<number | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (event.target.id !== id) setSelectedParameter("");
        }
        document.addEventListener("mousedown", handl