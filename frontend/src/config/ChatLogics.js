export const getSender = (user, participants) => {
    return participants[0]?._id === user?._id ? participants[1]?.fullName : participants[0]?.fullName;
};
export const getSenderForNotification = (user, participants) => {
    //console.log('getSender called with:', { user, participants });
    if (!participants || participants?.length < 2) return 'Unknown Sender';
    return participants[0]?._id === user?._id ? participants[1]?.username : participants[0]?.username;
};

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages?.length - 1 &&
        (messages[i + 1]?.sender?._id !== m?.sender?._id ||
            messages[i + 1]?.sender?._id === undefined) &&
        messages[i]?.sender?._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages?.length - 1 &&
        messages[messages?.length - 1]?.sender?._id !== userId &&
        messages[messages?.length - 1]?.sender?._id
    );
};

export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strHours = padZero(hours);
    return `${strHours}:${minutes} ${ampm}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        (i < messages?.length - 1 &&
            messages[i + 1]?.sender?._id !== m?.sender?._id &&
            messages[i]?.sender?._id !== userId) ||
        (i === messages?.length - 1 && messages[i]?.sender?._id !== userId)
    )
        return false;
    else if (
        i < messages?.length - 1 &&
        messages[i + 1]?.sender?._id === m?.sender?._id &&
        messages[i]?.sender?._id !== userId
    )
        return false;
    else return true;
};

export const isReceiver = (messages, m, i, userId) => {
    if (
        i < messages?.length - 1 &&
        messages[i + 1]?.sender?._id === m?.sender?._id &&
        messages[i]?.sender?._id !== userId
    )
        return true;
    else return false;
    
}

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1]?.sender?._id === m?.sender?._id;
};
