const Notification = ({message}) => {
    // if(message === null) {
    //     return null
    // }
    const messageStyle = {
        border: "solid",
        background: "lightgrey",
        fontSize: 20,
        padding: 5,
        marginBottom: 10
    }
    return (
        <>
            {message !== "" ? 
                <div style={messageStyle}>
                    <p>{message}</p>
                </div>
            : ""
            }
        </>
    )
}

export default Notification;