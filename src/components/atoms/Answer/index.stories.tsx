import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Answer, { AnswerProps } from ".";

export default {
  title: "atoms/Answer",
  component: Answer,
} as Meta;

const Template: Story<AnswerProps> = (args) => <Answer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  index: 0,
  onClick: () => console.log("click answer!"),
  correct: true,
  showResult: "",
  children: "답변 1",
};
