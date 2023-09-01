import UserList from "./UserList";

export default function RightPanel() {
  const users = ["Hrkz", "asasdw qd", "sdfsdfgsrdgw4e"];
  return (
    <div className="w-2/12 bg-slate-800 rounded-r-lg min-h-screen pt-1 px-1">
      <p className="text-gray-200 text-lg font-bold text-center">Users</p>
      <div className="relative">
        <input
          type="text"
          placeholder="Nickname"
          className="focus:outline-none p-1 absolute"
        />
        <button className="bg-gray-400 hover:brightness-125 p-1 absolute right-0">
          OK
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {users.map((user) => {
          return <UserList user={user} key={user} />;
        })}
      </div>
    </div>
  );
}
