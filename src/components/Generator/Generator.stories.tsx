import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Generator from "./Generator";

const meta: Meta<typeof Generator> = {
  component: Generator,
  title: "tsook/Generator",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Generator>;

export const Primary: Story = (args) => (
  <Generator data-testId="Generator-id" {...args} />
);
Primary.args = {
    id: "Generator-id",
    parameters: [
        {
            id: "model",
            name: "Model",
            value: "gpt-3.5-turbo",
            type: "nominal",
            allowedValues: ["gpt-3