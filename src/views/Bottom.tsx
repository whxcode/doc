import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  text: string;
  colorClass: string;
  onBtnClick: () => void;

  icon: any;
}

const BottomBtn = ({ text, colorClass, icon, onBtnClick }: IProps) => (
  <button
    type="button"
    className={`btn btn-block no-border ${colorClass}`}
    onClick={onBtnClick}
  >
    <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
    {text}
  </button>
);

export default BottomBtn;
