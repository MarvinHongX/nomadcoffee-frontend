import styled from "styled-components";

const FormError = styled.span`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function ShopFormError({ message }) {
  return message === "" || !message ? null : <FormError>{message}</FormError>;
}

export default ShopFormError;