// "use client";

import { TABLE_DATE_FORMAT } from "~/constants";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ReturnType } from "~/app/api/voyage/getAll/route";
import useVoyage from "~/app/hooks/use-voyage";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { fetchDataOnServer } from "~/lib/server-actions";

export const VoyageTable = () => {
  const { data: voyages } = useQuery<ReturnType>({
    queryKey: ["voyages"],
    queryFn: () => fetchDataOnServer("voyage/getAll"),
  });

  const { deleteVoyage } = useVoyage({});

  const handleDelete = (voyageId: string) => {
    deleteVoyage.mutate(voyageId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Port of loading</TableHead>
          <TableHead>Port of discharge</TableHead>
          <TableHead>Vessel</TableHead>
          <TableHead>Unit Types</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voyages?.map((voyage) => (
          <TableRow key={voyage.id}>
            <TableCell>
              {format(new Date(voyage.scheduledDeparture), TABLE_DATE_FORMAT)}
            </TableCell>
            <TableCell>
              {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
            </TableCell>
            <TableCell>{voyage.portOfLoading}</TableCell>
            <TableCell>{voyage.portOfDischarge}</TableCell>
            <TableCell>{voyage.vessel.name}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger className="hover:underline">
                  {voyage.unitTypes.length}
                </PopoverTrigger>
                <PopoverContent className="rounded-lg bg-slate-600 p-2 hover:cursor-pointer">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Length</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {voyage.unitTypes.map((unitType) => (
                        <TableRow key={unitType.id}>
                          <TableCell>{unitType.name}</TableCell>
                          <TableCell className="text-right">
                            {unitType.defaultLength.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </PopoverContent>
              </Popover>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(voyage.id)} variant="outline">
                X
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
