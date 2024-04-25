import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Lens from "./Lens";

const meta: Meta<typeof Lens> = {
  component: Lens,
  title: "tsook/Lens",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Lens>