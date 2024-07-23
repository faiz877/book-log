import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../services/api"; // Make sure this is your API instance
import useAuthStore from "../store/authStore";

const useBooks = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Fetch books
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery(
    "books",
    async () => {
      const response = await api.get("/books");
      return response.data;
    },
    {
      enabled: !!user, // Only run the query if user is authenticated
    }
  );

  // Add book mutation
  const addBookMutation = useMutation(
    async (newBook) => {
      const response = await api.post("/books", newBook);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
      },
      onError: (error) => {
        console.error("Add book error:", error);
      },
    }
  );

  // Update book mutation
  const updateBookMutation = useMutation(
    async ({ id, updatedBook }) => {
      const response = await api.put(`/books/${id}`, updatedBook);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
      },
      onError: (error) => {
        console.error("Update book error:", error);
      },
    }
  );

  // Delete book mutation
  const deleteBookMutation = useMutation(
    async (id) => {
      await api.delete(`/books/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
      },
      onError: (error) => {
        console.error("Delete book error:", error);
      },
    }
  );

  return {
    books,
    isLoading,
    error,
    addBook: addBookMutation.mutate,
    updateBook: updateBookMutation.mutate,
    deleteBook: deleteBookMutation.mutate,
  };
};

export default useBooks;
