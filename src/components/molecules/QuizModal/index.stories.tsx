import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import QuizModal, { QuizModalProps } from ".";

export default {
  title: "molecules/QuizModal",
  component: QuizModal,
} as Meta;

const Template: Story<QuizModalProps> = (args) => <QuizModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  quizInfo: {
    question: "다음 중 동물이 아닌 것은?",
    correctIndex: 2,
    answers: ["사자", "고양이", "초콜릿", "호랑이"],
  },
};
