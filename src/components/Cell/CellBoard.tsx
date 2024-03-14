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
   