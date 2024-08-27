import axios from "axios";

const BASE_URL = "http://localhost:3000";

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  createdAt: Date;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  url?: string | null;
  organizer: {
    id: string;
    username: string;
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  events?: Event[];
}

export interface CreateEventInput {
  title: string;
  description?: string | null;
  location?: string | null;
  imageUrl: string;
  startDate: Date | string;
  endDate: Date | string;
  url?: string | null;
}

export interface UpdateEventInput {
  id: string;
  title?: string;
  description?: string | null;
  location?: string | null;
  imageUrl?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  url?: string | null;
}

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${BASE_URL}/events/all`);
  return response.data;
};

export const getEventsByUser = async (): Promise<Event[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/events/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await axios.get(`${BASE_URL}/events/${id}`);
  return response.data;
};

export const createEvent = async (event: CreateEventInput): Promise<Event> => {
  const response = await axios.post(`${BASE_URL}/events`, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateEvent = async (event: UpdateEventInput): Promise<Event> => {
  const response = await axios.put(`${BASE_URL}/events/${event.id}`, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (id: string): Promise<Event> => {
  const response = await axios.delete(`${BASE_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  createdAt: Date;
  user?: User;
  event?: Event;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${BASE_URL}/orders/all`);
  return response.data;
};

export const getOrdersByEventId = async (id: string): Promise<Order[]> => {
  const response = await axios.get(`${BASE_URL}/orders/event/${id}`);
  return response.data;
};

export const getOrdersByUser = async (): Promise<Order[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/orders/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createOrder = async (eventId: string): Promise<Order> => {
  const response = await axios.post(
    `${BASE_URL}/orders`,
    { eventId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const deleteOrder = async (id: string): Promise<Order> => {
  const response = await axios.delete(`${BASE_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
