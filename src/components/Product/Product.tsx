import { useState } from "react";
import { useFetchAllProduct } from "../../logic/query/getAllProducts";
import { List, Card, Button, InputNumber } from "antd";
import { usePostNewOrder } from "../../logic/mutation/createOrder";
import { toast } from "react-toastify";

const Product = () => {
  const { data: allProduct } = useFetchAllProduct();
  const userid = localStorage.getItem("userid");
  const [quantities, setQuantities] = useState([]);

  const handleQuantityChange = (productId: number, value: number | null) => {
    setQuantities((prev: any) => ({
      ...prev,
      [productId]: value ?? 1, // Ensure at least 1 item is selected
    }));
  };

  const newOrderMutate = usePostNewOrder();
  const handlePlaceOrder = async (product: any) => {
    console.log("product", product);

    const quantity = quantities[product.product_id] || 1;

    const body = {
      quantity: quantity,
      product_id: product.product_id,
      deliveryStatus: "pending",
      user_id: Number(userid),
    };

    const response = await newOrderMutate.mutateAsync([body]);
    if (response.data.error) {
      toast.error(response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.success("order has placed.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={allProduct}
      renderItem={(product: any) => (
        <List.Item>
          <Card title={product.productName}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={(value) =>
                  handleQuantityChange(product.product_id, value)
                }
              />
              <Button type="primary" onClick={() => handlePlaceOrder(product)}>
                Place Order
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Product;
