import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is DemoTasker?',
    answer: 'DemoTasker is a platform where you can earn virtual coins by solving simple math equations, captchas, and claiming daily rewards. These coins can then be used within the platform for various purposes.',
  },
  {
    question: 'How do I earn coins?',
    answer: 'You can earn coins by: solving math equations, solving captchas, and claiming daily rewards.',
  },
  {
    question: 'Is there a limit to how many equations/captchas I can solve?',
    answer: "No, there's no limit — you can solve as much as you want.",
  },
  {
    question: 'What are daily tasks?',
    answer: 'Daily tasks are additional challenges, such as solving a certain number of equations or captchas, that offer extra coin rewards upon completion. You can view your progress and claim rewards from the \'Daily Tasks\' modal.',
  },
  {
    question: 'How do I claim my daily reward?',
    answer: 'Navigate to the \'Daily Reward\' mode on the main page and click the \'Claim Reward\' button. You can claim this reward once every 24 hours.',
  },
  {
    question: 'What can I do with the coins I earn?',
    answer: 'Currently, coins are used within the platform for various features. More functionalities and ways to utilize your coins will be added in future updates.',
  },
  {
    question: 'How do I withdraw?',
    answer: 'To withdraw your earnings, go to the Contact section and send us a message on our Facebook page.',
  },
  {
    question: 'What is the minimum withdrawal amount?',
    answer: 'The minimum withdrawal amount is 1,000 coins, which is equal to 1 PHP.',
  },
];

const FAQItem = ({ faq, index, open, setOpen }) => {
  const isOpen = index === open;

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800"
      >
        <span>{faq.question}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-green-500 mb-6 text-center">Frequently Asked Questions</h1>
      <div>
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} open={open} setOpen={setOpen} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;

