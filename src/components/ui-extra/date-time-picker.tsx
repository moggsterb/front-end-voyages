import { format } from "date-fns";
import {
  Control,
  FieldValues,
  Path,
  useWatch,
  UseFormTrigger,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { FORM_DATE_FORMAT } from "~/constants";
import { useEffect } from "react";
import { updateDate } from "~/lib/utils";

type DateTimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  watchedName: Path<T>;
  trigger: UseFormTrigger<T>;
};

export const DateTimePicker = <T extends FieldValues>({
  control,
  name,
  label,
  watchedName,
  trigger,
}: DateTimePickerProps<T>) => {
  const watchedValue = useWatch({ control, name: watchedName });

  useEffect(() => {
    if (watchedName) {
      trigger(name);
    }
  }, [watchedValue, name, control, watchedName]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={`w-full pl-3 text-left font-normal ${
                    !field.value ? "text-muted-foreground" : ""
                  }`}
                >
                  {field.value ? (
                    format(field.value, FORM_DATE_FORMAT)
                  ) : (
                    <span>Pick a date and time</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(selectedDate) => {
                  field.onChange(updateDate(field.value, selectedDate));
                  field.onBlur();
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
              <div className="m-2 flex flex-row items-center justify-end">
                <FormLabel
                  htmlFor={`${name}-time`}
                  className="items-cente mx-5"
                >
                  Time
                </FormLabel>
                <Input
                  id={`${name}-time`}
                  type="time"
                  className="w-auto"
                  value={format(field.value || new Date(), "HH:mm")}
                  onChange={(e) => {
                    field.onChange(
                      updateDate(field.value, undefined, e.target.value),
                    );
                  }}
                  onBlur={field.onBlur}
                />
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
