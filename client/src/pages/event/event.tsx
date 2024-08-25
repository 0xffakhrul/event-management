import { useParams } from "react-router-dom";
import { useGetEventById } from "../../api/event";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";

export const Event = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useGetEventById(id ?? "");

  const formattedStartDate = (startDate: Date) => {
    return format(startDate, "E, LLL d yyyy,  p");
  };
  const formattedEndDate = (endDate: Date) => {
    return format(endDate, "E, LLL d yyyy,  p");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <img src={event.imageUrl} alt={event.title} />
      </div>
      <div className="p-4 space-y-1">
        <h1 className="font-black text-4xl pb-3">{event.title}</h1>
        <p className="font-black pb-2">
          by{" "}
          <span className="font-semibold text-violet-600">
            {event.organizer.username}
          </span>
        </p>
        <div className="font-semibold flex items-center gap-2 pb-2">
          <Calendar className="h-5 w-5" />
          <p>
            {formattedStartDate(event.startDate)} -{" "}
            {formattedEndDate(event.endDate)}
          </p>
        </div>
        <div className="font-semibold flex items-center gap-2 pb-2">
          <MapPin className="h-5 w-5" />
          <p>{event.location}</p>
        </div>
        <div className="flex flex-col py-3">
          <span className="font-semibold pb-3">About this event</span>
          <p>{event.description}</p>
          {/* <p>
            {event.url && (
              <p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  Event Website
                </a>
              </p>
            )}
          </p> */}
        </div>
      </div>
    </div>
  );
};

