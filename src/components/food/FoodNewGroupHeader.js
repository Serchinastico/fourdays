import React from "react";
import FoodGroupHeader from './FoodGroupHeader';

class FoodNewGroupHeader extends React.PureComponent {
    render() {
        const { id, name, onGroupSelected } = this.props;

        return (
            <FoodGroupHeader 
                id={id} 
                name={name} 
                icon={require("../../images/icon/Add.png")} 
                onGroupSelected={onGroupSelected} />
        );
    }
}

export default FoodNewGroupHeader;
