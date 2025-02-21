import { useEffect, useState } from "react";
import { List, Button, Typography, Select } from "antd";
import { useUpdateOrder } from "../../logic/mutation/updateOrder";
import { useFetchAllOrder } from "../../logic/query/getAllOrders";
import { useNavigate } from "react-router-dom";
import { useFetchAllOrderForPartner } from "../../logic/query/getAllOrdersForPartner";

const { Text } = Typography;
const { Option } = Select;

const deliveryOptions = [
  "pending",
  "accepted",
  "out for delivery",
  "delivered",
];

const filterdeliveryOptions = [
  "all",
  "pending",
  "accepted",
  "out for delivery",
  "delivered",
];
const Delivery = () => {
  const navigate = useNavigate();
  const [selectedFilterStatus, setselectedFilterStatus] = useState("all");

  const { data: allOrders, refetch: refetchAllOrder } =
    useFetchAllOrderForPartner(selectedFilterStatus);

  useEffect(() => {
    refetchAllOrder();
  }, []);

  const [updatedOrders, setUpdatedOrders] = useState<any[]>([]);

  useEffect(() => {
    setUpdatedOrders(allOrders || []);
  }, [allOrders]);

  const [selectedStatuses, setSelectedStatuses] = useState<any[]>([]);

  const handleStatusChange = (orderId: any, value: any) => {
    setSelectedStatuses({ ...selectedStatuses, [orderId]: value });
  };

  const updateOrderMutate = useUpdateOrder();

  const updateDeliveryStatus = async (orderId: any) => {
    console.log(selectedStatuses[orderId], orderId);
    const body = {
      deliveryStatus: selectedStatuses[orderId],
    };
    const response = await updateOrderMutate.mutateAsync([orderId, body]);
    refetchAllOrder();
    // setOrders((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order.order_id === orderId
    //       ? {
    //           ...order,
    //           deliveryStatus: selectedStatuses[orderId] || order.deliveryStatus,
    //         }
    //       : order
    //   )
    // );
  };

  //   useEffect(() => {
  //     const socket = new WebSocket("ws://localhost:4000"); // Connect to WebSocket server

  //     socket.onopen = () => {
  //       console.log("WebSocket Connected");
  //     };

  //     socket.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         console.log("resr", data);

  //         if (data.type === "ORDER_UPDATED") {
  //           console.log("Order Updated:", data.orderid, data.updatedStatus);

  //           setUpdatedOrders((prevOrders) =>
  //             prevOrders.map((order) =>
  //               order.order_id === data.orderid
  //                 ? { ...order, deliveryStatus: data.updatedStatus }
  //                 : order
  //             )
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Invalid JSON received:", event.data);
  //       }
  //     };

  //     socket.onclose = () => console.log("WebSocket Disconnected");

  //     return () => {
  //       socket.close(); // Cleanup WebSocket on unmount
  //     };
  //   }, []);

  const handleFilterStatusChange = (status: any) => {
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
          onChange={(value) => handleFilterStatusChange(value)}
          style={{ width: 150 }}
          value={selectedFilterStatus}
          allowClear={true}
        >
          {filterdeliveryOptions?.map((status: any) => (
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
              <Select
                defaultValue={order.deliveryStatus || "Select Status"}
                onChange={(value) => handleStatusChange(order.order_id, value)}
                style={{ width: 150 }}
              >
                {deliveryOptions.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>,
              <Button
                type="primary"
                onClick={() => updateDeliveryStatus(order.order_id)}
                //   disabled={!selectedStatuses[order.order_id]}
              >
                Update
              </Button>,
              <Button
                onClick={() => handleMap(order.order_id)}
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

export default Delivery;
