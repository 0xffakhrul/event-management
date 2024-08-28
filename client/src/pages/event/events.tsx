import { format, parseISO } from "date-fns";
import { useAllEvents } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import banner from "../../assets/banner-eve.jpg";

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
      <div className="mx-auto mb-8 relative">
        <div className="relative">
          <img
            src={banner}
            alt="Event banner"
            className="h-64 w-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black opacity-60 rounded-2xl"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="px-6 text-2xl lg:text-4xl font-bold text-white shadow-text">
            Explore Unforgettable Experiences
          </h1>
          <p className="text-sm lg:text-base text-white max-w-2xl px-6">
            Dive into a world of extraordinary events tailored just for you.
            Discover the best places, connect with amazing people, and create
            lasting memories.
          </p>
        </div>
      </div>
      <h2 className="font-black text-2xl pb-6">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <div
            className="shadow relative overflow-hidden rounded-lg group max-w-sm mx-auto"
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
          </div>
        ))}
      </div>
    </div>
  );
};
