const Notification = ({ message }) => {
  if (message === null) return null;
  if (message.startsWith("Succeed!, "))
    return <div className="success">{message}</div>;
  if (message.startsWith("X, ")) return <div className="error">{message}</div>;
};
export default Notification;
