import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { VoyageScreen } from "~/components/voyages/voyage-screen";
import getQueryClient from "~/lib/getQueryClient";
import { fetchDataOnServer } from "~/lib/server-actions";

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["voyages"],
      queryFn: () => fetchDataOnServer("voyage/getAll"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["unitTypes"],
      queryFn: () => fetchDataOnServer("unitType/getAll"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["vessels"],
      queryFn: () => fetchDataOnServer("vessel/getAll"),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex w-full flex-col">
        <VoyageScreen />
      </div>
    </HydrationBoundary>
  );
}
