type User = {
  email: string;
  userId: number;
}

interface SuperAddMe {
  (user: User): User[];
}

const allUsers: User[] = [
  { email: 'user1@example.com', userId: 1 },
  { email: 'user2@example.com', userId: 2 }
];

const addUser: SuperAddMe = function (user: User): User[] {
  return [
    ...allUsers,
    user
  ];
};

console.log(addUser({ email: 'user3@example.com', userId: 3 }));
