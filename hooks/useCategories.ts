import { getCategories, postCategory } from "@/lib/api/category";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCategories() {
  const queryClient = useQueryClient();

  const { mutate: createCagetory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: postCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });

        toast.success("Category created successfully");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("Error creating category");
      },
    }
  );

  const {
    isLoading: isLoadingCategories,
    data,
    isError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = data?.map((category: any) => {
    return camelCase(category);
  });

  return {
    isLoadingCategories,
    categories,
    isError,
    createCagetory,
    isCreatingCategory,
    refetchCategories,
  };
}
