import React from "react";
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
    let icon;
    let colorClass;

    switch (type) {
        case "error":
            icon = <AiOutlineCloseCircle className="text-red-500 text-2xl" />;
            colorClass = "bg-red-100 text-red-700";
            break;
        case "success":
            icon = <AiOutlineCheckCircle className="text-green-500 text-2xl" />;
            colorClass = "bg-green-100 text-green-700";
            break;
        case "loading":
            icon = (
                <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-2xl" />
            );
            colorClass = "bg-blue-100 text-blue-700";
            break;
        default:
            icon = null;
    }

    return (
        <div className={`flex items-center p-3 mb-2  ${colorClass} space-x-3`}>
            {icon}
            <span className="text-xs font-medium">{message || 'An unexpected error occurred'}</span>
        </div>
    );
};

export default AlertMessage;