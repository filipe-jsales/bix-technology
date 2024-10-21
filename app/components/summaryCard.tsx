/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components';
// @ts-ignore
const SummaryCard = ({ title, value, color }) => {
  return (
    <CardContainer color={color}>
      <h3>{title}</h3>
      <p>{value}</p>
    </CardContainer>
  );
};

export default SummaryCard;

const CardContainer = styled.div`
  background-color: ${(props) => props.color || '#fff'};
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
