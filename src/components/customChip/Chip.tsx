import * as styled from "./style";
interface chip_props {
  name: string;
  onClick: () => void;
}
const Chip = ({ name, onClick }: chip_props) => {
  return <styled.chipContainer onClick={onClick}>{name}</styled.chipContainer>;
};

export default Chip;
