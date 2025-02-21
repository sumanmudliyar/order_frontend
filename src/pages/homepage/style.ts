import styled from "styled-components";

export const chipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

export const flexColumnGap10 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

export const skeletionDiv = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow values as needed */
`;
