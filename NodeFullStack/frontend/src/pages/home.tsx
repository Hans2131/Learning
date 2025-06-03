import type { UserDto } from "@shared/models/user";

interface HomeProps {
  user: UserDto | null;
}

export default function Home({ user }: HomeProps) {
  return (
    <div>
      <h1>Home page</h1>
      {user && <p>Welcome back, {user.username}!</p>}
    </div>
  );
}
