import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const useBooks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: books = [] } = useQuery(
    "books",
    async () => {
      const response = await api.get("/books");
      return response.data;
    },
    {
      enabled: !!user, // Only run the query if user is authenticated
    }
  );

  // ... rest of the hook implementation

  return {
    books,
    addBook: addBook.mutate,
    updateBook: updateBook.mutate,
    deleteBook: deleteBook.mutate,
  };
};

export default useBooks;
