import React from "react";
import styled from "styled-components";
import { LensProps, GenerationProps } from "./Lens.types";

import { ObjectsContext } from "../../context/ObjectsContextProvider";

import ListLens from "./ListLens";
import SpaceLens from "./SpaceLens";
import PlotLens from "./PlotLens";
import RatingLens from "./RatingLens";

const LensContainer = styled.div`
    flex: 1;
`;

const Lens: React.FC<LensProps> = ({ 
    id,
    type,
    style,
    onGenerationClick,
    getGenerationMetadata
}) => {
    const { generations, lenses } = React.useContext(ObjectsContext);

    const currLens = lenses.find((lens) => lens.id === id);

    const groupedLensIds = lenses.map((lens) => currLens?.group === lens.group ? lens.id : null);
    const generationsData = generations.filter((generation) => {
        if(generation.lensId === null) return false;
        