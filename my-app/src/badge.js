import { useUser } from "@clerk/clerk-react";

export default function Badge() {
  const { user } = useUser();
  return <span>Logged in as {user.fullName}</span>;
}