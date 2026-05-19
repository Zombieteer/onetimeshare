import { useQuery } from "@tanstack/react-query";
import { getShareById } from "./shares";

export function useGetShareDetails(id: string) {
  return useQuery({
    queryKey: ["share-details", id],
    queryFn: () => getShareById(id),
    retry: false, // don't retry 404/410s
  });
}