"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TreePalm } from "lucide-react";

import { BreathDialog } from "./breathExDialog";

export function DialogBreath() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            
            className="h-8 w-8 md:h-[42px] md:w-[42px] hover:scale-110 transition-transform duration-200 bg-white/30 backdrop-blur-sm text-[#fec195] rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <TreePalm />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[#fec195]">
          <p>Тайвширах дасгал</p>
        </TooltipContent>
      </Tooltip>

      <BreathDialog setOpen={setOpen} open={open} />
    </div>
  );
}
