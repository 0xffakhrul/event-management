import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetEventById, useUpdateEvent } from "../../api/event";
import { UpdateEventInput } from "../../api/request";

export const Update = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useGetEventById(id ?? "");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title ?? "");
      setDescription(event.description ?? "");
      setLocation(event.location ?? "");
      setImageUrl(event.imageUrl ?? "");
      setStartDate(event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : "");
      setEndDate(event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : "");
      setUrl(event.url ?? "");
    }
  }, [event]);

  const updateEventMutation = useUpdateEvent();

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEvent: UpdateEventInput = {
      id: id ?? "",
      title,
      description,
      location,
      imageUrl,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      url,
    };

    try {
      await updateEventMutation.mutateAsync(updatedEvent);
      toast.success("Event successfully updated!");
      navigate(`/event/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Update Event</h2>
      <form onSubmit={handleUpdateEvent} className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-violet-600 text-white font-bold"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
