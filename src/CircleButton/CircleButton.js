import React from "react";
<<<<<<< Updated upstream
//import ".CircleButton.css";
=======
import "./CircleButton.css";
import PropTypes from "prop-types";
>>>>>>> Stashed changes

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props;
  return React.createElement(
    props.tag,
    {
      className: ["NavCircleButton", props.className].join(" "),
      ...otherProps,
    },
    props.children
  );
}

NavCircleButton.defaultProps = {
  tag: "a",
};

NavCircleButton.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  otherProps: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.array,
};
