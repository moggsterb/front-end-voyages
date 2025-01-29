"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { VoyageForm } from "./voyage-form";
import { VoyageTable } from "./voyage-table";

export const VoyageScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="my-4">Create</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>New Voyage</SheetTitle>
          <SheetDescription>All voyage fields are mandatory</SheetDescription>
          <VoyageForm handleClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <VoyageTable />
    </div>
  );
};
