import styled from "styled-components";

export const cardMaincontainer = styled.div`
  height: fit-content;
  border-radius: 10px;
  display: flex;
  flex-direction: row-gap;
  background: var(--White-40, #f0f0f0);
  padding: 10px;
  gap: 10px;
`;

export const fooditemImage = styled.img`
  height: 100px;
  border-radius: 5px;
`;

export const imgContainer = styled.div``;

export const fooditemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const itemName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const price = styled.div`
  display: flex;
  align-items: center;
`;
export const description = styled.div`
  font-size: 13px;
  color: #505148;
`;
