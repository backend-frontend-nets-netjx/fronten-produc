
/*
"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { createProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";

  

 export function ProductForm({product}:any) {
    const {register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) =>{
        console.log(data);
        //await createProduct(data);
        await createProduct({
          ...data,
          price: parseFloat(data.price), 
        });
        // navegar a la pagina principal
        router.push("/");
        router.refresh();
    })

  return (
    <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Nombre del Producto"  
              {...register('name')}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripcion del Producto</Label>
              <Input id="description" placeholder="Descripcion detalla del Producto" 
              {...register('description')}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio del Producto</Label>
              <Input id="price" placeholder="Precio del Producto"
               {...register('price')}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Imagen del Producto</Label>
              <Input id="image" placeholder="imagen del Producto" 
              {...register('image')}/>
            </div>
          </div>
          <Button>Crear Producto</Button>
        </form>
  );
}

*/
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";

export function ProductForm({product}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    }
  });
  const router = useRouter();
  const params = useParams<{id: string}>();
  console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      const res = await updateProduct(params.id, {
        ...data,
        price: parseFloat(data.price),
      })
      console.log(res)
    } else {
    await createProduct({
      ...data,
      price: parseFloat(data.price),
    });
    }

    router.push("/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Product Name</Label>
      <Input {...register("name")} />

      <Label>Description</Label>
      <Input {...register("description")} />

      <Label>Price</Label>
      <Input {...register("price")} />

      <Label>Image</Label>
      <Input {...register("image")} />

      <Button>
        {
          params.id ? 'Update Product' : 'Create Product'
        }
      </Button>
    </form>
  );
}
