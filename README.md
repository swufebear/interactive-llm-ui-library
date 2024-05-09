
# Interactive LLM UI Library

## Overview

The Interactive LLM UI Library provides a variety of object components that assist in crafting Large Language Model (LLM)-powered writing interfaces that promote object-oriented interaction. Object-oriented interaction enables users to experiment and iterate with LLMs more flexibly. The objects featured in this library include: **Cells** (input text segments), **Generators** (sets of model parameters), and **Lenses** (output containers). This library is an incarnation of the [Cells, Generators, and Lenses](https://llm-objects.kixlab.org/) design framework introduced at UIST 2023.

## Getting Started

To start, install the package using `npm install interactive-llm-ui-library`. Refer to the `demo` directory for examples of how to import and use these components.

## Components

This section provides an overview of the various components available in the library.

| Name | Description | Properties |
| --------- | ----------- | ----------- |
| `ObjectContextProvider` | Houses necessary context and information about existing objects, their contents, and properties. Facilitates management of objects by providing helper functions for controlling, manipulating, and transferring information between these objects. | <ul> <li>`children`: Component(s) wrapped by the context provider.</li> <li>`cells`: Initial set of cells array.</li> <li>`generators`: Initial set of predictors array.</li> <li>`lenses`: Initial set of lenses array.</li> <li>`generateHandler`: Function to generate text or list of text based on input text or list of text and model parameters.</li> <li>`minimizeHandler`: Function to process text to produce a minimized version of the text.</li> </ul> |
| `Cell` | Represents a text fragment as an object. Cells can be interconnected to depict a complete text input. | <ul> <li>`id`: Unique string ID. </li> <li>`text`: Text fragment contained within the cell object.</li> <li>`isActive`: Controls whether the cell is activated and will be used when generating.</li> <li>`isSelected`: Controls whether the cell is selected. Selected cells can be copied, deleted, etc.</li> <li>`isHovered`: Controls whether the cell is being hovered on.</li> <li>`isMinimized`: Controls whether the cell is minimized and displays the minimized text when enabled.</li> <li>`minimizedText`: Minimized version of the text.</li> <li>`tabDirection`: Can take values 'top', 'right', 'bottom', or 'left' determining the side of the cell to have additional padding space.</li> <li>`onClick`, `onMouseEnter`, `onMouseLeave`: Handlers for mouse events.</li> <li>`parentCellId`: ID of the cell this cell is connected to.</li> <li>`style`: Style for the cell container.</li> </ul> |
| `Generator` | Represents a set of model parameter configurations for generating outputs. Generators can be connected to cells to take its text (and text of all cells connected from that cell) as input. Also, Generators can be connected to lenses where its generation outputs will be contained and represented. | <ul> <li>`id`: Unique string ID. </li> <li>`parameters`: Array of parameter objects, where each object contains the parameter information and the current parameter value.</li> <li>`color`: Color of the generator.</li> <li>`size`: Accepts values 'small', 'medium', and 'large'.</li> <li>`numColumns`: Number of parameters shown in each row of the generator.</li> <li>`isGenerating`: Controls whether the generator is generating.</li> <li>`isSelected`: Controls whether the generator is selected.</li> <li>`cellId`: ID of cell connected to the generator.</li> <li>`lensId`: ID of lens connected to the generator.</li> <li>`onMouseEnter`, `onMouseLeave`: Handlers for mouse events.</li> </ul> |
| `Lens` | Represents containers of generated outputs and can depict the outputs in various ways to support exploration of these outputs. Lenses can be connected together by assigning to the same group: lenses in the same group will display the same generated outputs. Examples of these representations are provided in the table below (e.g., `ListLens`, `SpaceLens`). | <ul><li>`id`: Unique string ID.</li> <li>`type`: Determines the type of lens. Currently takes values 'list', 'space', 'rating', or 'plot'.</li> <li>`style`: Style of the lens container.</li> <li>`onGenerationClick`: Handler function for when a generation is clicked in the lens.</li> <li>`group`: Group number that the lens belongs to.</li> <li>`getGenerationMetadata`: Handler function to process outputs to produce metadata that is used to represent these outputs (e.g., `getPosition` or `getRating` for the `SpaceLens` and `RatingLens` respectively).</li> </ul> |

Alongside **Cell** and **Lens** objects, there are a few examples showcasing the different forms these objects can manifest.

| Name | Description | Properties |
| --------- | ----------- | ----------- |
| `CellBoard` | A board of cells where the user can create multiple rows of cells and multiple cells within these rows. Individual cells in each row are selected to compile an input. | <ul> <li>`initialBoard`: 2d-array that contains strings used to create cells and populate the board.</li> <li>`maxRows` and `maxColumns`: Maximum number of rows and columns that the board can support.</li> <li>`setEntryCell`: Helper function to obtain the leaf-most cell, which can concatenate the full input of selected cells.</li> <li>`style`: Style for the board container.</li> </ul> |
| `CellTree` | A tree depiction of cells where parent-child relationships represent sentences that are continuations to each other. Each cell is minimized, and they are represented by a rectangle containing the minimized text for the cell. | <ul> <li>`cellWidth` and `cellheight`: Width and height of each individual cell block in the tree.</li> <li>`style`: Style for the tree container.</li> </ul> |
| `CellEditor` | A QuillJS-based text editor that displays the concatenation of multiple selected cells and allows editing of individual cells directly on the editor. | <ul> <li>`cellIds`: IDs of cells to be displayed in the text editor.</li> <li>`style`: Style for the editor container.</li> <li>`textColor`: Color of text in the editor.</li> </ul> |
| `ListLens` | A lens that displays different outputs as a hierarchical list. Outputs are initially grouped based on the input used for generation and then grouped based on the model parameter settings used for the generation. | <ul> <li>`generations`: Array of generated outputs.</li> <li>`onGenerationClick`: Handler function for when a generation is clicked in the lens.</li> </ul> |
| `SpaceLens` | A lens that displays different outputs as dots in a 2D space. The position of each output is calculated by the `getPosition` function passed to the component. | <ul> <li>`generations`: ...</li> <li>`onGenerationClick`: ...</li> <li>`getPosition`: Calculates the position of outputs (x, y coordinates) to represent in the lens.</li> </ul> |
| `PlotLens` | A lens that displays different outputs as dots in a scatter plot. The user can select the axis for the plot, and the value of the dots for each axis is determined by the `getRatings` function passed to the component. | <ul> <li>`generations`: ...</li> <li>`onGenerationClick`: ...</li> <li>`getRatings`: Calculates the ratings of outputs on multiple dimensions.</li> </ul> |
| `RatingLens` | A lens that displays the ratings given to each output on multiple dimensions. The ratings of these outputs are calculated by the `getRatings` function passed to the component. | <ul> <li>`generations`: ...</li> <li>`onGenerationClick`: ...</li> <li>`getRatings`: ...</li> </ul> |