const ChatMessage = ({ message, user }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={user.image}
          width="32"
          height="32"
          alt="User 01"
        />
        <div className="truncate">
          <span className="text-sm font-medium text-gray-800">{user.name}</span>
        </div>
      </div>
      <div className="ml-2">
        <div className="text-sm font-medium text-gray-800">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
