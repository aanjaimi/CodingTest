"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Topic } from "@/types/topic";

type ComboboxProps = {
  topics: Topic[];
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export function ComboboxDemo(props: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {props.value
              ? props.topics.find((topic) => topic.value === props.value)?.label
              : "Select topic..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search topic..." className="h-9" />
            <CommandEmpty>No topic found.</CommandEmpty>
            <CommandGroup>
              {props.topics.map((topic) => (
                <CommandItem
                  key={topic.value}
                  value={topic.value}
                  onSelect={(currentValue) => {
                    props.setValue(currentValue === props.value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {topic.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      props.value === topic.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
