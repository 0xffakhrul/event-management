import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  deleteEvent,
  Event,
  getAllEvents,
  getEventsByUser,
  getEventById,
  updateEvent,
} from "./request";

export const useAllEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
};

export const useGetEventsByUser = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEventsByUser,
  });
};

export const useGetEventById = (id: string) => {
  return useQuery<Event, Error>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
