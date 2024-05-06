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
        generateHandler: