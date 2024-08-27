import { Event } from "../../api/request";
import { useDeleteEvent, useGetEventsByUser } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { ArrowRight, SquarePen, Trash, User } from "lucide-react";
import toast from "react-hot-toast";
import { useGetOrdersByUser } from "../../api/order";
import { format } from "date-fns";

export const Profile = () => {
  const { data: userEvents, isLoading } = useGetEventsByUser();
  const { data: joinedEvents } = useGetOrdersByUser();
  const deleteEventMutation = useDeleteEvent();
  const navigate = useNavigate();

  const formattedStartDate = (startDate: Date) => {
    return format(startDate, "E, LLL d • p");
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleNavigateToUpdate = (eventId: string) => {
    navigate(`/event/${eventId}/edit`);
  };

  const handleNavigateToOrders = (eventId: string) => {
    console.log("handleNavigateToOrders called with eventId:", eventId);
    navigate(`/event/${eventId}/orders`);
    console.log("Navigation attempted");
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEventMutation.mutate(eventId);
    toast.success("Event successfully deleted");
  };

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Joined Events</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {joinedEvents?.map((event: any) => (
          <div
            className="shadow relative overflow-hidden rounded-lg group"
            onClick={() => handleEventClick(event.id)}
          >
            <p className="absolute inset-0 z-10">
              <span className="sr-only">View</span>
            </p>
            <img
              src={event.event.imageUrl}
              alt="Product 1"
              className="object-cover w-full transition-all group-hover:scale-105 aspect-video"
            />
            <div className="p-4 bg-background space-y-2 flex flex-col justify-end">
              <div>
                <h3 className="text-lg font-bold md:text-xl overflow-hidden text-ellipsis">
                  {event.event.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  {formattedStartDate(event.event.startDate)}
                </p>
                <p className="text-sm font-semibold text-gray-500 overflow-hidden text-ellipsis">
                  {event.event.location}
                </p>
              </div>
              <div className="flex items-center gap-1 pt-2 mt-auto">
                <User className="w-4 h-4" />
                <p className="text-sm font-semibold text-gray-500">
                  {event.event.organizer.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-black text-2xl py-6">Organized Events</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {userEvents?.map((event: Event) => (
          <div
            key={event.id}
            className="shadow relative overflow-hidden rounded-lg group"
            onClick={(e) => {
              e.stopPropagation();
              handleEventClick(event.id);
            }}
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
            <div className="p-4 bg-background space-y-2 flex flex-col justify-end">
              <div>
                <h3 className="text-lg font-bold md:text-xl overflow-hidden text-ellipsis">
                  {event.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  {formattedStartDate(event.startDate)}
                </p>
                <p className="text-sm font-semibold text-gray-500 overflow-hidden text-ellipsis">
                  {event.location}
                </p>
              </div>
              <div className="flex items-center gap-1 pt-2 mt-auto">
                <User className="w-4 h-4" />
                <p className="text-sm font-semibold text-gray-500">
                  {event.organizer.username}
                </p>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToOrders(event.id);
              }}
              className="text-sm flex justify-end items-center gap-1.5 font-medium text-violet-500 px-4 pb-4 cursor-pointer"
            >
              <p>Attendees List</p>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
