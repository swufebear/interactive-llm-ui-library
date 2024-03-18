import React from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import { DeltaStatic, Sources } from "quill";

import { CellProps } from "./Cell.types";
import { ObjectsContext } from "../../context/ObjectsContextProvider";

const Container = styled.div<{ textColor?: string }>`
    ${({ textColor }) => textColor ? `& span { color: ${textColor} !important; }` : ""}
`;

interface CellEditorProps {
    cellIds: string[];
    style?: React.CSSProperties;
    textColor?: string;
}

let Inline = Quill.import('blots/inline');
class CellBlot extends Inline {
    static create(value: any) {
        let node = super.create(value);
        node.setAttribute('id', value.id);
        node.setAttribute('style', value.style);
        return node;
    }

    static value(node: any) {
        return {
            id: node.getAttribute('id'),
            style: node.getAttribute('style')
        };
    }

    format(name: any, value: any) {
        if (name === CellBlot.blotName && value) {
            this.domNode.setAttribute('id', value.id);
            this.domNode.setAttribute('style', value.style);
        } else {
            super.format(name, value);
        }
    }
}
CellBlot.blotName = 'cell';
CellBlot.tagName = 'span';
Quill.register('formats/cell', CellBlot);

const formats = [
    'bold', 'italic', 'strike', 'underline', 
    'color', 'background', 'font', 'code',
    'cell'
];

const CellEditor: React.FC<CellEditorProps> = ({ 
    cellIds,
    style,
    textColor
}) => {
    const quillRef = React.useRef<any | null>(null);
    const reactQuillRef = React.useRef<ReactQuill | null>(null);

    const { cells, updateCell, addCell, toggleCell } = React.useContext(ObjectsContext);
    const [value, setValue] = React.useState<string>("");

    const prevCellIds = React.useRef<string[]>(cellIds);
    const prevCells = React.useRef<CellProps[]>(cells);
    
    const attachQuillRefs = () => {
        if (typeof reactQuillRef.current?.getEditor !== 'function') return;
        const quill = reactQuillRef.current.getEditor();
        if (quill != null) quillRef.current = quill;
    }

    const getOrderedActiveCells = () => {
        var newActiveCells: CellProps[] = cellIds.map(cellId => {
            const cell = cells.find(cell => cell.id == cellId);
            return cell;
        }) as CellProps[];

        // reorder newActiveCells from parent to child
        const newActiveCellsOrdered: CellProps[] = [];
        var currParent = newActiveCells.find(cell => !cell.parentCellId);
        while(currParent) {
            newActiveCellsOrdered.push(currParent);
            currParent = newActiveCells.find(cell => cell.parentCellId == currParent?.id);
        }

        return newActiveCellsOrdered;
    }

    React.useEffect(() => {
        attachQuillRefs();
        initializeCells(getOrderedActiveCells());
    }, []);

    React.useEffect(() => {
        if(cellIds.length == prevCellIds.current.length && cellIds.every((value, index) => value == prevCellIds.current[index])) return;

        initializeCells(getOrderedActiveCells());

        prevCellIds.current = cellIds;
    }, [cellIds]);

    React.useEffect(() => {
        // check if any cell has been selected that was not previously selected
        c