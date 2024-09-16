"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Lock } from "lucide-react";
import { useCarouselStore } from "@/store/carouselStore";

interface Chapter {
  name: string;
  unlockXp: string;
  imageUrl: string;
}

export const ThreeDCard : React.FC<Chapter> = ({imageUrl,name,unlockXp}) => {
  const {userXP} = useCarouselStore()
  const locked = ((userXP < Number(unlockXp)) || isNaN(Number(unlockXp)) ) ? true : false;
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-gray-50  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border ">
        <CardItem translateZ="100">
          <Image
            src={imageUrl}
            height="700"
            width="600"
            className="h-90 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            loading="lazy"
            aria-label="thumbnail"
          />
          {locked && 
          ( <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <Lock className="text-white w-12 h-12" />
            </div>
          )}
        </CardItem>
        <div className="flex justify-center">
        <CardItem
          translateZ="50"
          className="font-bold text-neutral-600 dark:text-white pt-5"
        >
          {locked ? "Coming Soon" : name}
        </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
