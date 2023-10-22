export default function ProductSwiper({ products }) {
  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-9">
      {products.map((product, i) => {
        return (
          <div className="flex flex-col items-center justify-center" key={i}>
            <div className="w-32">
              <img src={`https://ipfs.io/ipfs/${product.cid}`} />
            </div>
            <div className="text-lg mb-2">{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Quantity: {product.quantity}</div>
            <div>Total: ${product.total}</div>
          </div>
        );
      })}
    </div>
  );
}
