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
 