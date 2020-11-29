import React from "react";
<<<<<<< Updated upstream
//import './NotefulForm.css'
=======
import "./NotefulForm.css";
import PropTypes from "prop-types";
>>>>>>> Stashed changes

export default function NotefulForm(props) {
  const { className, ...otherProps } = props;
  return (
    <form
      className={["Noteful-form", className].join(" ")}
      action="#"
      {...otherProps}
    />
  );
}

NotefulForm.propTypes = {
  className: PropTypes.string,
};
