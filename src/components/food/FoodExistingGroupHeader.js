import React from "react";
import FoodGroupHeader from './FoodGroupHeader';

class FoodExistingGroupHeader extends React.PureComponent {
    static getOpenCloseImage(isOpen) {
        if (isOpen) {
            return require("../../images/icon/ChevronUp.png")
        } else {
            return require("../../images/icon/ChevronDown.png")
        }
    }

    render() {
        const { id, name, isOpen, onGroupSelected } = this.props;

        return (
            <FoodGroupHeader id={id} name={name} icon={FoodExistingGroupHeader.getOpenCloseImage(isOpen)} onGroupSelected={onGroupSelected} />
        );
    }
}

export default FoodExistingGroupHeader;
