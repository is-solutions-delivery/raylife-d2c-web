import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;

  box-shadow: 0px 10px 30px rgba(77, 133, 255, 0.09);
  border-radius: 0.5rem;
`;

export const CardActions = styled.div`
  &,
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  & > div {
    justify-content: flex-end;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .content-row {
    display: flex;
    flex-direction: row;
    flex: 1;
    gap: 1rem;
    align-items: flex-end;
    justify-content: space-between;
  }

  .content-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }
`;
