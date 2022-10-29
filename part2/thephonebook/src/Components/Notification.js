const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    
    return (     
            <div className={message.id}>{message.message}</div>
    )
}
export default Notification