"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Menu } from "@/types/menu";
import { Profile } from "@/types/profile";
import { OpeningHour } from "@/types/openingHour";
import Link from "next/link";
import { Facebook, Instagram, Mail, Twitter } from "react-feather";

const HomeSection = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [menuRes, profileRes, openingHoursRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/menus/`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/opening-hour/`),
      ]);
      setMenus(menuRes.data);
      setProfiles(profileRes.data);
      setOpeningHours(openingHoursRes.data);
    }
    fetchData();
  }, []);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}.${minutes}`;
  };

  return (
    <section className='container'>
      <div className='flex flex-col gap-10 my-10'>
        {profiles?.map((profile) => (
          <div key={profile.id} className='flex flex-col gap-6'>
            <div className='flex items-center gap-10'>
              <Image
                src={profile.logo}
                alt={profile.name}
                width={160}
                height={160}
                className='shadow-lg rounded-3xl'
              />
              <div className='flex flex-col gap-2'>
                <h2 className='text-3xl font-bold'>{profile.name}</h2>
                <p>{profile.address}</p>
                <p>{profile.phone}</p>
              </div>
            </div>
            <div className='p-6 shadow-lg rounded-xl border'>
              <p>{profile.about_us}</p>
            </div>
            <div className='flex items-center gap-6'>
              <Link href={profile.email} className='p-3 border shadow-lg rounded-xl'>
                <Mail />
              </Link>
              <Link
                href={profile.facebook}
                className='p-3 border shadow-lg rounded-xl'
              >
                <Facebook />
              </Link>
              <Link
                href={profile.instagram}
                className='p-3 border shadow-lg rounded-xl'
              >
                <Instagram />
              </Link>
              <Link href={profile.twitter} className='p-3 border shadow-lg rounded-xl'>
                <Twitter />
              </Link>
            </div>
          </div>
        ))}
        <div className='flex flex-col justify-center items-center'>
          <h2 className='mb-8 text-4xl font-bold'>Menu</h2>
          <div className='flex gap-8 flex-wrap justify-center items-center'>
            {menus.slice(0, 12).map((menu) => (
              <div
                key={menu.id}
                className='p-4 border shadow-lg rounded-xl w-64 flex flex-col items-center transform hover:scale-105 transition-transform duration-300'
              >
                <Image
                  src={menu.image}
                  alt={menu.name}
                  width={100}
                  height={100}
                  className='shadow-lg rounded-xl w-56 h-48 object-cover 8'
                />
                <p className='text-2xl font-bold w-full line-clamp-1'>
                  {menu.name}
                </p>
                <p className='text-lg font-bold w-full mb-2'>
                  Rp{menu.price}000,00
                </p>
                <p className='line-clamp-3 mb-4'>{menu.description}</p>
                <div className='w-full flex'>
                  <div className='flex border gap-3 px-4 py-2 shadow-md rounded-xl justify-center items-center'>
                    <div
                      className={`size-2 rounded-full ${
                        menu.category === "Pembuka"
                          ? "bg-green-400"
                          : menu.category === "Utama"
                          ? "bg-yellow-400"
                          : menu.category === "Penutup"
                          ? "bg-red-400"
                          : ""
                      }`}
                    />
                    <p className='text-lg font-bold'>{menu.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='mb-8 text-4xl font-bold'>Opening Hours</h2>
          <div className='flex gap-4 flex-wrap justify-center'>
            {openingHours.map((hour) => (
              <div
                key={hour.id}
                className='p-4 border shadow-lg rounded-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300'
              >
                <h3 className='font-bold text-xl'>{hour.day}</h3>
                {formatTime(hour.opening_time)} -{" "}
                {formatTime(hour.closing_time)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
