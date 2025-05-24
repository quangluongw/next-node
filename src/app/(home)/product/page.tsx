import { getProducts } from "@/services/product";
import { products } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Product() {
  const data:products[] = await getProducts();

  return (
    <div>
      <div className="mx-auto sm:mt-12">
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {data?.map((item) => (
            <article className="mb-2 sm:mb-8 cursor-pointer" key={item._id}>
              <div className="rounded-lg transition-all dark:hover:bg-[#1B1F24] ">
                <Link href={`product/${item._id}`}>
                  <div className="p-4">
                    <Image
                      src={item.imageUrl}
                      width={300}
                      height={300}
                      className="aspect-video w-full rounded-md object-cover"
                      alt=""
                    />
                    <div className="pt-3 md:pt-6">
                      <h2 className="line-clamp-3 text-pretty py-1.5 text-lg font-semibold leading-8 md:text-xl">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">5/10/2024</p>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-3 flex">
                  <p className="bg-purple-500/20 text-purple-600 hover:!text-purple-600 dark:bg-purple-500/20 dark:text-purple-500 dark:hover:text-purple-500 font-medium inline-block px-2.5 py-1 rounded-full text-xs transition-all">
                    {item.caterori?.name}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
