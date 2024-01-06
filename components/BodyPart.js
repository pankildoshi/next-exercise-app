import React from "react";
import Image from "next/image";
import BodyPartIcon from "@/assets/icons/body-part.png";

export default function BodyPart({
  item,
  bodyPart,
  setBodyPart,
  handleBodyPartChange,
}) {
  return (
    <div
      className={
        bodyPart === item
          ? "w-[160px] h-[160px] flex flex-col items-center justify-center cursor-pointer border-b-4 border-rose-600"
          : "w-[160px] h-[160px] flex flex-col items-center justify-center cursor-pointer"
      }
      onClick={() => {
        setBodyPart(item);
        handleBodyPartChange(item);
      }}
    >
      <Image
        src={BodyPartIcon}
        alt="Bodypart image"
        width="100px"
        height="100px"
      />
      <p className="text-lg font-semibold">{item.toUpperCase()}</p>
    </div>
  );
}
