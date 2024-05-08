import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor } from '@testing-library/react';

import Generator from "../components/Generator/Generator";
import Lens from "../components/Lens/Lens";
import { ObjectsContextProvider, ObjectsContext, IObjectsContext } from "./ObjectsContextProvider";

describe("ObjectsContextProvider", () => {
    var mockContextProvider: {
        generators: any[];
        lenses: any[];
        generateHandler: (input: string | string[], parameters: any) => Promise<string | string[]>;
    } = {
        generators: [],
        lenses: [],
        generateHandler: async (input: string | string[], parameters: any) => {
            return "output";
        }
    };

    const MockChild = () => {
        const { generators, lenses } = React.useContext<IObjectsContext>(ObjectsContext);

        return (
            <div data-testid="ChildComponent">
                {generators.map((generator: any) => (
                    <Generator 
                        key={generator.id}
                        {...generator}
                    />
                ))}
                {lenses.map((lens: any) => (
                    <Lens 
                        key={lens.id}
                        {...lens}
                        onGenerationClick={(generation: string) => {}}
                    />
                ))}
            </div>
        );
    }

    test("renders ObjectsContextProvider component", () => {
        render(
            <ObjectsContextProvider {...mockContextProvider}>
                <MockChild/>
            </ObjectsContextProvider>
        );
        expect(screen.getByTestId("ChildComponent")).toBeInTheDocument();
    });

    mockContextProvider = {
        ...mockContextProvider,
        generators: [
            {
                id: "Generator-id",
                parameters: [
                    {
                        id: "model",
                        name: "Model",
                        value: "gpt-3.5-turbo",
                        type: "nominal",
                        allowedValues: ["gpt-3.5-turbo", "gpt-4", "text-davinci-003"],
                        valueNicknames: {"gpt-