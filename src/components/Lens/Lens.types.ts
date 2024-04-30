import { ParameterProps } from "../Generator/Generator.types";

export interface LensProps {
    id: string;
    type: string;
    style?: React.CSSProperties;
    onGenerationClick?: (generationText: string) => void;
    group: number;
    getGenerationMetadata?: (generations: GenerationProps[]) => Promise<any[]>;
}

export interface GenerationProps {
    id: string;
  