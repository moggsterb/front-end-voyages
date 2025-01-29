"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DateTimePicker } from "../ui-extra/date-time-picker";
import { set, startOfTomorrow } from "date-fns";
import useVoyage from "~/app/hooks/use-voyage";
import { UnitType } from "@prisma/client";

import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import {
  CheckboxGroup,
  CheckboxGroupOptions,
} from "../ui-extra/checkbox-group";
import { fetchDataOnServer } from "~/lib/server-actions";

const FormSchema = z
  .object({
    portOfLoading: z.string().nonempty("You must enter a loading port"),
    portOfDischarge: z.string().nonempty("You must enter a discharge port"),
    vessel: z.string().nonempty("Please select a vessel"),
    departure: z.date({
      required_error: "You must supply a date",
    }),
    arrival: z.date({
      required_error: "You must supply a date",
    }),
    unitTypes: z
      .array(z.string())
      .min(5, "Please select at least 5 unit types"),
  })
  .refine((data) => data.arrival > data.departure, {
    message: "Scheduled arrival must be later than scheduled departure.",
    path: ["arrival"],
  });

export type VoyageFormData = z.infer<typeof FormSchema>;

interface Vessel {
  value: string;
  label: string;
}

interface VoyageFormProps {
  handleClose: () => void;
}

export const VoyageForm = ({ handleClose }: VoyageFormProps) => {
  const { data: vessels } = useQuery<Vessel[]>({
    queryKey: ["vessels"],
    queryFn: () => fetchDataOnServer("vessel/getAll"),
  });

  const { data: unitTypes } = useQuery<UnitType[]>({
    queryKey: ["unitTypes"],
    queryFn: () => fetchDataOnServer("unitType/getAll"),
  });

  const unitTypeOptions: CheckboxGroupOptions[] =
    unitTypes?.map(({ id, name, defaultLength }) => {
      return {
        id,
        name,
        extra: defaultLength.toFixed(2),
      };
    }) || [];

  const { createVoyage } = useVoyage({ successFn: handleClose });

  const form = useForm<VoyageFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      portOfLoading: "",
      portOfDischarge: "",
      vessel: "",
      departure: set(startOfTomorrow(), { hours: 9 }),
      arrival: set(startOfTomorrow(), { hours: 15 }),
      unitTypes: [],
    },
    mode: "onBlur",
  });

  const {
    formState: { isValid },
  } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createVoyage.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="vessel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vessel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vessel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vessels?.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portOfLoading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port of Loading</FormLabel>
              <FormControl>
                <Input placeholder="Enter port" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portOfDischarge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port of Discharge</FormLabel>
              <FormControl>
                <Input placeholder="Enter port" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DateTimePicker
          control={form.control}
          name="departure"
          label="Scheduled Departure"
          watchedName="arrival"
          trigger={form.trigger}
        />

        <DateTimePicker
          control={form.control}
          name="arrival"
          label="Scheduled Arrival"
          watchedName="departure"
          trigger={form.trigger}
        />

        <CheckboxGroup
          control={form.control}
          name="unitTypes"
          options={unitTypeOptions}
          label="Unit Types (select 5+)"
        />

        <Button
          type="submit"
          disabled={!isValid}
          className={`w-full ${isValid ? "bg-green-400" : ""}`}
        >
          {isValid ? <CheckCircledIcon /> : <LockClosedIcon />} Submit
        </Button>
      </form>
    </Form>
  );
};
