import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getAllOrders,
  getOrdersByEventId,
  getOrdersByUser,
  Order,
} from "./request";
import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const useAllOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};

export const useGetOrdersByUser = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrdersByUser,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetOrdersByEventId = (eventId: string) => {
  return useQuery<Order[], Error>({
    queryKey: ["orders", eventId],
    queryFn: () => getOrdersByEventId(eventId),
  });
};
