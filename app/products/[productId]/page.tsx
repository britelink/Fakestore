import React from 'react'

    const productPage = async ({ params }: { params:  Promise<{ productId: string }> }) => {
        const { productId } =  await params;
        const product = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const productData = await product.json();
  return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
            <p>Product Name: {productData.title}</p>
            <p>Product Price: {productData.price}</p>
            <p>Product Description: {productData.description}</p>
            <p>Product Category: {productData.category}</p>
            <p>Product Image: {productData.image}</p>
            <img src={productData.image} alt={productData.title} />
    </div>
  )
}

export default productPage