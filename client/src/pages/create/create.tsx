import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateEvent } from "../../api/event";
import { CreateEventInput } from "../../api/request";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const createEventMutation = useCreateEvent();

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: CreateEventInput = {
      title,
      description,
      location,
      imageUrl,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      url,
    };
    try {
      await createEventMutation.mutateAsync(newEvent);
      console.log(newEvent);

      toast.success("Event successfully created!");
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Create Event</h2>
      <form onSubmit={handleCreateEvent} className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-6">
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
        <div className="grid sm:grid-cols-2 gap-5">
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
        <div className="grid sm:grid-cols-2 gap-5">
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
            className=" px-5 py-2 rounded-md bg-violet-600 text-white font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
