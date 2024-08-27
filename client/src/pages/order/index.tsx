import { useParams } from "react-router-dom";
import { useGetOrdersByEventId } from "../../api/order";
import { Order as OrderType } from "../../api/request";

export const Order = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orders, isLoading, error } = useGetOrdersByEventId(id ?? "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="font-black text-2xl pb-6">Orders</h2>
      {orders && orders.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order: OrderType) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-gray-100 rounded-full font-semibold text-gray-800 inline-flex text-xs">
                    {order.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.event?.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.user?.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};
