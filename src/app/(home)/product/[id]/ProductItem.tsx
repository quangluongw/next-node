"use client";
import React, { useState } from "react";
import AddCart from "../components/AddCart";
import Image from "next/image";
import Quantity from "../components/Quantity";
interface productitem {
  data: {
    imageUrl: string;
    name: string;
    caterori: {
      name: string;
    };
    _id: string;
    description: string;
  };
}
export default function ProductItem({ data }: { data: productitem }) {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="row mt-12">
      <div className="col-lg-12">
        <div className="card" style={{ boxShadow: "none" }}>
          <div className="card-body">
            <div className="row gx-lg-5">
              {/* end col */}
              <Image
                src={data.data?.imageUrl}
                width={200}
                height={200}
                alt={data.data?.name}
              />
              <div className="col-xl-8">
                <div className="mt-xl-0 mt-5">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <h4>{data.data?.name.slice(0, 70) + "..."}</h4>
                      <div className="hstack gap-3 flex-wrap">
                        {/* <div>
                          <a href="#" className="text-primary d-block">
                            Tommy Hilfiger
                          </a>
                        </div> */}
                        <div className="text-black mt-2">
                          Category :
                          <span className="text-body fw-medium">
                            {data.data?.caterori.name}
                          </span>
                        </div>
                        {/* <div className="text-black mt-2">
                          Published :
                          <span className="text-body fw-medium">
                            {FormatDate({ date: data.data?.created_at })}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <br />
                  <Quantity quantity={quantity} setQuantity={setQuantity} />
                  <AddCart id={data.data?._id} quantity={quantity} />
                  <div className="product-content mt-5">
                    <h5 className="text-[17px] mb-3 font-medium">
                      Product Description :
                    </h5>
                    <div
                      className="tab-content border p-4 rounded-md"
                      id="nav-tabContent"
                    >
                      <div className="tab-pane fade active show">
                        <div>
                          <h5 className="font-size-16 mb-3">
                            {data.data?.name}
                          </h5>
                          <p>{data.data.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
