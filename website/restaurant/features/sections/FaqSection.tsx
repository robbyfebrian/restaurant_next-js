"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@/types/faq";
import { useState, useEffect } from "react";
import axios from "axios";

const FaqSection = () => {
  const [faq, setFaq] = useState<Faq[]>([]);

  useEffect(() => {
    async function fetchFaq() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/faq/`
        );
        setFaq(response.data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    }

    fetchFaq();
  }, []);

  return (
    <section className='container'>
      <div className='flex flex-col gap-10 my-10 justify-center items-center'>
        <h2 className='text-4xl font-bold'>Frequently Asked Question</h2>
        <Accordion type='single' collapsible className='w-full'>
          {faq.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger className='text-xl font-bold'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-xl'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
