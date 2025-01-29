import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createVoyageOnServer,
  deleteVoyageOnServer,
} from "~/lib/server-actions";

import { toast } from "./use-toast";
import { VoyageFormData } from "~/components/voyages/voyage-form";

const useVoyage = ({ successFn }: { successFn?: () => void }) => {
  const queryClient = useQueryClient();

  const deleteVoyage = useMutation({
    mutationFn: async (voyageId: string) => {
      await deleteVoyageOnServer(voyageId);
    },
    onSuccess: async () => {
      toast({ description: "Voyage Deleted" });
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
    },
    onError: async (err: Error) => {
      toast({ title: err.name, description: err.message });
    },
  });

  const createVoyage = useMutation({
    mutationFn: async (data: VoyageFormData) => {
      await createVoyageOnServer(data);
    },
    onSuccess: async () => {
      toast({ description: "Voyage Created" });
      if (successFn) successFn();
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
    },
    onError: async (err: Error) => {
      toast({ title: err.name, description: err.message });
    },
  });

  return { deleteVoyage, createVoyage };
};

export default useVoyage;
