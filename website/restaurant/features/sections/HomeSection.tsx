"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Menu } from "@/types/menu";
import { Profile } from "@/types/profile";
import { OpeningHour } from "@/types/openingHour";
import Link from "next/link";
import { Facebook, Instagram, Mail, Twitter } from "react-feather";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Faq } from "@/types/faq";

const HomeSection = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [faq, setFaq] = useState<Faq[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [profileRes, faqRes, openingHoursRes] = await Promise.all([
        axios.get("http://localhost:8000/api/profile/"),
        axios.get("http://localhost:8000/api/faq/"),
        axios.get("http://localhost:8000/api/opening-hour/"),
      ]);
      setProfiles(profileRes.data);
      setFaq(faqRes.data);
      setOpeningHours(openingHoursRes.data);
    }
    fetchData();
  }, []);

  return (
    <section className='container'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-6xl font-bold text-white'>Profile Restoku</h1>
        {profiles?.map((profile) => (
          <div key={profile.id} className='flex gap-6'>
            <div className='flex items-center gap-10'>
              <div className='flex flex-col gap-4'>
                <Image
                  src={profile.logo}
                  alt={profile.name}
                  width={160}
                  height={160}
                  className='shadow-lg rounded-3xl w-[300px]'
                />
                <Link
                  href={profile.email}
                  className='p-3 border shadow-lg rounded-xl max-w-min flex items-center gap-2 text-white'
                >
                  <Mail />
                  <span>{profile.email}</span>
                </Link>
                <Link
                  href={profile.facebook}
                  className='p-3 border shadow-lg rounded-xl max-w-min flex items-center gap-2 text-white'
                >
                  <Facebook />
                  <span>{profile.facebook}</span>
                </Link>
                <Link
                  href={profile.instagram}
                  className='p-3 border shadow-lg rounded-xl max-w-min flex items-center gap-2 text-white'
                >
                  <Instagram />
                  <span>{profile.instagram}</span>
                </Link>
                <Link
                  href={profile.twitter}
                  className='p-3 border shadow-lg rounded-xl max-w-min flex items-center gap-2 text-white'
                >
                  <Twitter />
                  <span>{profile.twitter}</span>
                </Link>
              </div>
            </div>
            <div className='p-6 shadow-lg rounded-xl border-2 bg-white'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-bold'>{profile.name}</h2>
                <p>{profile.address}</p>
                <p>{profile.phone}</p>
                <p className='pt-3'>{profile.about_us}</p>
              </div>
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-6 my-10 justify-center pt-4'>
          <h2 className='text-6xl font-bold text-white'>
            Frequently Asked Question
          </h2>
          <Accordion type='single' collapsible className='w-full text-white'>
            {faq.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className='text-xl font-bold'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-lg'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className='flex flex-col justify-center gap-6 pb-20'>
          <h2 className='text-6xl font-bold text-white'>Opening Hours</h2>
          <div className='flex gap-4 flex-wrap'>
            {openingHours.map((hour) => (
              <div
                key={hour.id}
                className='p-5 border-2 bg-white shadow-xl rounded-xl flex flex-col items-center gap-2'
              >
                <h3 className='font-bold text-xl'>{hour.day}</h3>
                {hour.opening_time} - {hour.closing_time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
