import { Event } from "../../api/request";
import { useDeleteEvent, useGetEventsByUser } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";

export const Profile = () => {
  const { data: userEvents, isLoading } = useGetEventsByUser();
  const deleteEventMutation = useDeleteEvent();

  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleNavigateToUpdate = (eventId: string) => {
    navigate(`/event/${eventId}/edit`);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEventMutation.mutate(eventId);
    toast.success("Event successfully deleted");
  };

  console.log(userEvents);

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Events</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {userEvents?.map((event: Event) => (
          <div
            key={event.id}
            className="shadow relative overflow-hidden rounded-lg group"
            onClick={() => handleEventClick(event.id)}
          >
            <p className="absolute inset-0 z-10">
              <span className="sr-only">View</span>
            </p>
            <img
              src={event.imageUrl}
              alt="Product 1"
              className="object-cover w-full transition-all group-hover:scale-105 aspect-video"
            />
            <div
              className="bg-white w-8 h-16 rounded-lg absolute top-3 right-3 z-20 flex flex-col items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <SquarePen
                className="w-4 h-4 mb-1 text-violet-500"
                onClick={() => handleNavigateToUpdate(event.id)}
              />
              <Trash
                className="w-4 h-4 mt-2 text-red-500"
                onClick={() => handleDeleteEvent(event.id)}
              />
            </div>
            <div className="p-4 bg-background space-y-2">
              <h3 className="text-lg font-semibold md:text-xl overflow-hidden text-ellipsis ">
                {event.title}
              </h3>
              <p className="text-sm font-bold text-gray-600"></p>
              <p className="text-sm font-bold text-gray-500">
                {event.location}
              </p>
              <p className="text-sm font-bold text-gray-500">
                {event.organizer.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
