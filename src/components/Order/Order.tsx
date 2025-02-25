import { useEffect, useState } from "react";
import { useFetchAllOrder } from "../../logic/query/getAllOrders";
import { List, Button, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const deliveryOptions = [
  "all",
  "pending",
  "accepted",
  "out for delivery",
  "delivered",
];

const { Option } = Select;

const Order = () => {
  const navigate = useNavigate();

  const userid = localStorage.getItem("userid");

  const [selectedFilterStatus, setselectedFilterStatus] = useState("all");

  const { data: initialOrders } = useFetchAllOrder(
    selectedFilterStatus,
    userid
  ); // Fetch initial orders
  //   const [orders, setOrders] = useState(initialOrders || []);

  //   useEffect(() => {
  //     setOrders(initialOrders || []); // Set initial data when fetched
  //   }, [initialOrders]);

  const [updatedOrders, setUpdatedOrders] = useState<any[]>([]);

  useEffect(() => {
    setUpdatedOrders(initialOrders || []);
  }, [initialOrders]);

  useEffect(() => {
    const socket = new WebSocket("https://test.we-matter.xyz"); // Connect to WebSocket server

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("resr", data);

        if (data.type === "ORDER_UPDATED") {
          console.log("Order Updated:", data.orderid, data.updatedStatus);

          setUpdatedOrders((prevOrders: any) =>
            prevOrders.map((order: any) =>
              order.order_id == data.orderid
                ? { ...order, deliveryStatus: data.updatedStatus }
                : order
            )
          );
        }
      } catch (error) {
        console.error("Invalid JSON received:", event.data);
      }
    };

    socket.onclose = () => console.log("WebSocket Disconnected");

    return () => {
      socket.close(); // Cleanup WebSocket on unmount
    };
  }, []);

  const handleStatusChange = (status: any) => {
    if (status == undefined || status == "") {
      setselectedFilterStatus("all");
    } else {
      setselectedFilterStatus(status);
    }
  };

  const handleMap = (orderid: any) => {
    localStorage.setItem("orderid", orderid);
    navigate("/map");
  };
  return (
    <>
      <div>
        <Select
          placeholder="filter"
          onChange={(value) => handleStatusChange(value)}
          style={{ width: 150 }}
          value={selectedFilterStatus}
          allowClear={true}
        >
          {deliveryOptions.map((status: any) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>
      <List
        bordered
        dataSource={updatedOrders}
        renderItem={(order: any) => (
          <List.Item
            actions={[
              // <Button
              //   type="primary"
              //   danger
              //   disabled={order.deliveryStatus === "out for delivery"}
              //   onClick={() => handleCancel(order.order_id)}
              // >
              //   Cancel
              // </Button>,
              <Button
                onClick={() => handleMap(order.order_id)}
                disabled={order.deliveryStatus == "delivered"}
                //   disabled={!selectedStatuses[order.order_id]}
              >
                Location
              </Button>,
            ]}
          >
            <Text strong>Order ID:</Text> {order.order_id} &nbsp; | &nbsp;
            <Text strong>Product ID:</Text> {order.product_id} &nbsp; | &nbsp;
            <Text strong>Status:</Text>{" "}
            {order.deliveryStatus || "Not Available"}
          </List.Item>
        )}
      />
    </>
  );
};

export default Order;
