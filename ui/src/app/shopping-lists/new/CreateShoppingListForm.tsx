"use client";

import Alert from "@/shared/components/Alert";
import Button from "@/shared/components/Button";
import {
  CreateShoppingListBody,
  CreateShoppingListFormData,
  ShoppingListItem,
} from "@/shared/types/ShoppingLists";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ZodType, z } from "zod";

const CreateShoppingListSchema: ZodType<CreateShoppingListFormData> = z.object({
  name: z.string().min(3),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.string(),
        unit: z.enum(["pcs", "kg", "g"]),
        addedBy: z.string(),
      })
    )
    .min(1),
});

export default function CreateShoppingListForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [currentItem, setCurrentItem] = useState<ShoppingListItem>({
    name: "",
    quantity: "0",
    unit: "pcs",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateShoppingListFormData>({
    resolver: zodResolver(CreateShoppingListSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleChangeCurrentItem =
    (key: keyof ShoppingListItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setCurrentItem((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleAddItem = () => {
    append({ ...currentItem, addedBy: session?.user?.email! });
    setCurrentItem({ name: "", quantity: "0", unit: "pcs" });
  };

  const onSubmit = async (data: CreateShoppingListFormData) => {
    const body: CreateShoppingListBody = {
      ...data,
      createdBy: session?.user?.email!,
    };

    const response = await fetch("/api/shopping-lists", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.push("/shopping-lists");
    }
  };

  return (
    <div className="grid gap-4 my-6 w-[600px]">
      <div className="grid gap-1">
        <label className="text-sm font-medium">
          Enter your shopping list name
        </label>
        <input
          {...register("name")}
          required
          type="text"
          placeholder="My shopping list"
          className="input"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">
          Add items to your shopping list
        </label>
        {fields.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center border bg-gray-50 px-2"
          >
            <span>{index + 1}.</span>
            <span className="font-medium">{item.name}</span>
            <span className="flex-1">
              {item.quantity} {item.unit}
            </span>
            <Button
              variant="link"
              className="self-end"
              onClick={() => remove(index)}
            >
              ❌ Remove
            </Button>
          </div>
        ))}

        <div className="flex gap-4 mt-3">
          <input
            type="text"
            placeholder="Apples"
            className="input flex-1"
            value={currentItem.name}
            onChange={handleChangeCurrentItem("name")}
          />
          <input
            type="number"
            placeholder="1"
            min={0}
            className="input w-16"
            value={currentItem.quantity}
            onChange={handleChangeCurrentItem("quantity")}
          />
          <select
            className="input"
            value={currentItem.unit}
            onChange={handleChangeCurrentItem("unit")}
          >
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
          <Button
            disabled={!currentItem.name}
            variant="secondary"
            onClick={handleAddItem}
          >
            ➕ Add
          </Button>
        </div>
      </div>

      {Object.values(errors).length > 0 && (
        <Alert severity="error" className="my-2">
          {Object.values(errors).map((error) => error.message)[0]}
        </Alert>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          disabled={!isDirty || !isValid}
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        >
          ✔️ Create
        </Button>
      </div>
    </div>
  );
}
