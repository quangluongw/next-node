import Image from "next/image";
import React from "react";
// import avatar from "../image/z5524294549681_20c44fa401da2573eeb0bde376828d38.jpg";
import Link from "next/link";
import { getProducts } from "@/services/product";
import { products } from "@/types/product";
export default async function Home() {
  const dataProduct:products[] = await getProducts();

  return (
    <div>
      <section className="mt-8">
        <div className="flex justify-between sm:items-center max-[530px]:flex-col py-8 sm:py-10 rounded-lg sm:border dark:border-gray-100/10 border-gray-300 relative px-5 gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Lương Thành Quang
            </h1>
            <div className="flex my-4 *:transition-all *:border *:font-medium *:px-2 *:py-1 *:rounded-md *:text-sm hover:*:text-white">
              <p className="py-4 border-sky-500 text-sky-500 hover:bg-sky-500 hover:drop-shadow-md">
                Web developer
              </p>
            </div>
            <div className="flex">
              <a
                href="mailto:quang20042204@gmail.com"
                className="gap-2 bg-second text-black font-semibold py-3 sm:py-1.5 w-full tracking-wide text-center rounded-md transition-all bg-[#F3BA2F]"
              >
                Liên hệ
              </a>
            </div>
          </div>
          {/* <Image
            src={avatar}
            width={500}
            height={500}
            className=" w-full min-[530px]:w-40 aspect-square rounded-md object-cover"
            alt="avatar"
          /> */}
        </div>
      </section>
      <div className="mx-auto sm:mt-12">
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {dataProduct?.map((item) => (
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
