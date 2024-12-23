"use client";

import { Categories } from "@/types/categories";
import { Menu } from "@/types/menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const CategorySection = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [menuRes, categoriesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/menus/`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/menus/categories/`),
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
    <section className='container'>
      <div className='flex flex-col gap-6 my-10 justify-center items-center'>
        <h2 className='text-4xl font-bold'>Select by Categories</h2>
        <div className='w-full flex gap-6 justify-center items-center'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex gap-3 border px-4 py-2 shadow-md rounded-xl justify-center items-center cursor-pointer'
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
      </div>
      <div className='flex gap-8 flex-wrap justify-center items-center'>
        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            className='p-4 border shadow-lg rounded-xl w-64 flex flex-col items-center transform hover:scale-105 transition-transform duration-300'
          >
            <Image
              src={menu.image}
              alt={menu.name}
              width={100}
              height={100}
              className='shadow-lg rounded-xl w-56 h-48 object-cover'
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
    </section>
  );
};

export default CategorySection;
