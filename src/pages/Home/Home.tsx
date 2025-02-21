import Delivery from "../../components/Delivery/Delivery";
import Order from "../../components/Order/Order";
import Product from "../../components/Product/Product";
import { Tabs } from "antd";
import OrderLocation from "../Map/Map";

const Home = () => {
  const role = localStorage.getItem("role"); // Get role from localStorage

  // Define all tabs
  const allTabs = {
    product: {
      key: "1",
      label: "Product",
      children: <Product />,
    },
    myOrder: {
      key: "2",
      label: "My Order",
      children: <Order />,
    },
    delivery: {
      key: "3",
      label: "Delivery",
      children: <Delivery />,
    },
    // map: {
    //   key: "4",
    //   label: "location",
    //   children: <OrderLocation />,
    // },
  };

  // Filter tabs based on role
  const items =
    role === "customer"
      ? [allTabs.product, allTabs.myOrder]
      : role === "delivery"
      ? [allTabs.delivery]
      : [];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Home;
