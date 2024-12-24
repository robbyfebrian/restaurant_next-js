"use client";

import { Categories } from "@/types/categories";
import { Menu } from "@/types/menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const MenuSection = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [menuRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:8000/api/menus/"),
        axios.get("http://localhost:8000/api/menus/categories/"),
      ]);
      setMenus(menuRes.data);
      setCategories(categoriesRes.data);
    }
    fetchData();
  }, []);

  const filteredMenus = selectedCategory
    ? menus.filter((menu) => menu.category === selectedCategory)
    : menus;

  return (
    <section className='container min-h-[100vh] '>
      <div className='flex flex-col gap-6 my-10 justify-center'>
        <h1 className='text-6xl font-bold text-white'>Menu Restoku</h1>
        <p className='text-white text-xl'>Pilih menu yang kamu inginkan:</p>
        <div className='w-full flex gap-6'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex gap-3 px-4 py-2 shadow-md rounded-xl justify-center items-center cursor-pointer bg-white border-2'
              onClick={() => setSelectedCategory(category.name)}
            >
              <div
                className={`size-3 rounded-full ${
                  category.name === "Pembuka"
                    ? "bg-green-400"
                    : category.name === "Utama"
                    ? "bg-yellow-400"
                    : category.name === "Penutup"
                    ? "bg-red-400"
                    : ""
                }`}
              />
              <p className='text-2xl font-bold'>{category.name}</p>
            </div>
          ))}
        </div>
        <div className='flex gap-8 flex-wrap'>
          {filteredMenus.map((menu) => (
            <div
              key={menu.id}
              className='p-4 bg-white border-2 shadow-lg rounded-xl w-96 flex gap-4 items-center transform hover:scale-105 transition-transform duration-300'
            >
              <Image
                src={menu.image}
                alt={menu.name}
                width={100}
                height={100}
                className='shadow-lg rounded-xl w-40 h-36 object-cover'
              />
              <div className=''>
                <p className='text-2xl font-bold w-full line-clamp-1'>
                  {menu.name}
                </p>
                <p className='text-lg font-bold w-full mb-2'>
                  Rp{menu.price}000
                </p>
                <p className='line-clamp-3'>{menu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
