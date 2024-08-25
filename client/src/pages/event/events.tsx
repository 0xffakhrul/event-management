import { format, parseISO } from "date-fns";
import { useAllEvents } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export const Events = () => {
  const { data: events = [], isLoading } = useAllEvents();
  const formattedStartDate = (startDate: Date) => {
    return format(startDate, "E, LLL d • p");
  };

  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Events</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <div
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
            <div className="p-4 bg-background space-y-2">
              <h3 className="text-lg font-bold md:text-xl overflow-hidden text-ellipsis">
                {event.title}
              </h3>
              <p className="text-sm font-semibold text-gray-600">
                {formattedStartDate(event.startDate)}
              </p>
              <p className="text-sm font-semibold text-gray-500 overflow-hidden text-ellipsis">
                {event.location}
              </p>
              <div className="flex items-center gap-1 pt-2">
                <User className="w-4 h-4"/>
                <p className="text-sm font-semibold text-gray-500">
                  {event.organizer.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
