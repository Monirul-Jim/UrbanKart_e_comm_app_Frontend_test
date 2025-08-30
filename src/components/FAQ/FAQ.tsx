"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you will receive a tracking number via email. You can use it to track your order on our website.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, mobile banking, and SSLCOMMERZ payments.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 2–5 business days depending on your location.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, products can be returned within 7 days if they are unused and in original packaging.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, cash on delivery (COD) is available for selected locations.",
  },
  {
    question: "Are all products covered by warranty?",
    answer:
      "Most electronics come with a standard 1-year warranty. Please check product details for warranty information.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, orders can be canceled before they are shipped. Once shipped, cancellation is not possible.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only deliver within the country. International shipping will be available soon.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@example.com or call our hotline at 123-456-789.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-lg"
              >
                {faq.question}
                <span className="ml-2 text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
