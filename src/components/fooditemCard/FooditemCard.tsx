import * as styled from "./style";
import image from "../../assets/image/logo.png";
import Rupee from "../../assets/svg/Rupee";

interface fooditem_props {
  name: string;
  price?: number;
  description: string;
  foodImage?: any;
}

const FooditemCard = ({
  name,
  price,
  description,
  foodImage,
}: fooditem_props) => {
  return (
    <styled.cardMaincontainer>
      <styled.imgContainer>
        <styled.fooditemImage
          src={"http://192.168.100.127:3001/" + foodImage}
        />
      </styled.imgContainer>
      <styled.fooditemDetail>
        <styled.itemName>{name}</styled.itemName>
        <styled.price>
          <Rupee />

          {price}
        </styled.price>
        <styled.description>{description}</styled.description>
      </styled.fooditemDetail>
    </styled.cardMaincontainer>
  );
};

export default FooditemCard;
