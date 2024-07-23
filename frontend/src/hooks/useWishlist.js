import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [] } = useQuery("wishlist", async () => {
    const response = await api.get("/wishlist");
    return response.data;
  });

  const addWishlistItem = useMutation(
    (newItem) => api.post("/wishlist", newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wishlist");
      },
    }
  );

  const updateWishlistItem = useMutation(
    (updatedItem) => api.put(`/wishlist/${updatedItem.id}`, updatedItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wishlist");
      },
    }
  );

  const deleteWishlistItem = useMutation(
    (itemId) => api.delete(`/wishlist/${itemId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wishlist");
      },
    }
  );

  return {
    wishlistItems,
    addWishlistItem: addWishlistItem.mutate,
    updateWishlistItem: updateWishlistItem.mutate,
    deleteWishlistItem: deleteWishlistItem.mutate,
  };
};

export default useWishlist;
