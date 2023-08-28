import UserList from "./UserList";

export default function RightPanel() {
  const users = ["asdfdwsf", "asasdw qd", "sdfsdfgsrdgw4e"];
  return (
    <div className="w-2/12 bg-slate-800 rounded-r-lg min-h-screen pt-1">
      <p className="text-gray-200 text-lg font-bold text-center">Users</p>
      <input type="text" />
      <div className="flex flex-col gap-1 m-1">
        {users.map((user) => {
          return <UserList user={user} key={user} />;
        })}
      </div>
    </div>
  );
}
