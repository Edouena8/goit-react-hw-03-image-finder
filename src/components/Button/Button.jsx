import { LoadMoreBtn } from "./Button.styled";
import PropTypes from "prop-types";

const Button = ({ onLoadMoreButton }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMoreButton}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onLoadMoreButton: PropTypes.func.isRequired,
};

export default Button;

