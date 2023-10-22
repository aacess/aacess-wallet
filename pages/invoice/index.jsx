import React from "react";
import { useState } from "react";

import ProductSwiper from "@/components/ProductSwiper";
import { Button } from "@/components/ui/button";

export default function Invoice() {
  const products = [
    {
      cid: "bafkreifvallbyfxnedeseuvkkswt5u3hbdb2fexcygbyjqy5a5rzmhrzei",
      name: "Product 1",
      description: "Product 1 description",
      price: "100",
      quantity: "10",
      total: "1000",
    },
    {
      cid: "bafkreifvallbyfxnedeseuvkkswt5u3hbdb2fexcygbyjqy5a5rzmhrzei",
      name: "Product 2",
      description: "Product 1 description",
      price: "100",
      quantity: "10",
      total: "1000",
    },
    {
      cid: "bafkreifvallbyfxnedeseuvkkswt5u3hbdb2fexcygbyjqy5a5rzmhrzei",
      name: "Product 3",
      description: "Product 1 description",
      price: "100",
      quantity: "10",
      total: "1000",
    },
    {
      cid: "bafkreifvallbyfxnedeseuvkkswt5u3hbdb2fexcygbyjqy5a5rzmhrzei",
      name: "Product 4",
      description: "Product 1 description",
      price: "100",
      quantity: "10",
      total: "1000",
    },
  ];

  return (
    <div>
      <div className="text-2xl text-center mb-6 mt-20">Inventory</div>
      <ProductSwiper products={products} />
      <div className="mt-10 mb-20 justify-center items-center flex">
        <Button
          onClick={() => {
            setShowCreateInvoice(true);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
