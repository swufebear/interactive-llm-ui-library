import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { CellProps } from "./Cell.types";
import { ObjectsContext } from "../../context/ObjectsContextProvider";

const CellBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
`;

const CellRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const CellsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-grow: 1;
`;

const CellRowControls = styled.div`
    display: flex;
`;

const AddColumnButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
    border-radius: 8px;
    background-color: #0088ff99;
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #0088ff;
    }
    &:disabled {
        background-color: #dddddd;
        cursor: auto;   
    }
`;

const AddRowButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 160px;
    border-radius: 8px;
    background-color: #0088ff99;
    color: #ffffff;
    font-size: 16px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #0088ff;
    }
    &:disabled {
        background-color: #dddddd;
        cursor: auto;   
    }
`;

interface CellBoardProps {
    initialBoard: string[][];
    maxRows: number;
    maxColumns: number;
    setEntryCell: (cellId: string | undefined) => void;
    style?: React.CSSProperties;
}

const CellBoard: React.FC<CellBoardProps> = ({
    initialBoard, 
    maxRows, 
    maxColumns, 
    setEntryCell,
    style
}) => {
    const [board, setBoard] = React.useState<string[][]>([]); // 2d array of cell ids
    const [activeCells, setActiveCells] = React.useState<(string | undefined)[]>([]); // array of cell ids or undefined for each row
    const { cells, addCell, linkCells, unlinkCell, toggleCell } = React.useContext(ObjectsContext);

    // initialize board
    React.useEffect(() => {
        var newBoard = initialBoard.map(row => row.map(text => {
            