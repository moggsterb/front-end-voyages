import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";

export type CheckboxGroupOptions = {
  id: string;
  name: string;
  extra: string;
};

type CheckboxGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: CheckboxGroupOptions[];
  label: string;
};

export const CheckboxGroup = <T extends FieldValues>({
  control,
  name,
  options,
  label,
}: CheckboxGroupProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              {options &&
                options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value.includes(option.id)}
                      onChange={() => {
                        if (field.value.includes(option.id)) {
                          field.onChange(
                            field.value.filter(
                              (item: string) => item !== option.id,
                            ),
                          );
                        } else {
                          field.onChange([...field.value, option.id]);
                        }
                        field.onBlur();
                      }}
                      id={`unitType-${option.id}`}
                    />
                    <Label
                      htmlFor={`unitType-${option.id}`}
                      className="flex w-full flex-row justify-between"
                    >
                      <span>{option.name}</span>
                      <span>{option.extra}</span>
                    </Label>
                  </div>
                ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
