"use client";
import React from "react";
import { Slider, Button } from "@nextui-org/react";
import { TbVolume, TbVolumeOff } from "react-icons/tb";

export default function App() {
  const [value, setValue] = React.useState(25);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        aria-label="Volume"
        size="lg"
        color="success"
        value={value}
        onChange={setValue}
        startContent={
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setValue((prev) => (prev >= 10 ? prev - 10 : 0))}
          >
            <TbVolumeOff className="text-2xl" />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setValue((prev) => (prev <= 90 ? prev + 10 : 100))}
          >
            <TbVolume className="text-2xl" />
          </Button>
        }
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">
        Current volume: {value}
      </p>
    </div>
  );
}
