type UserListProps = {
  user: string;
};

export default function UserList({ user }: UserListProps) {
  return <div className="bg-cyan-900 rounded-md p-1">
    <p className="text-white">{user}</p>
  </div>;
}
