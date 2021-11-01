type User = {
  _id: number,
  email: string,
  token: string
}

type Admin = {
  accessPages: string[],
  lastLogin: Date
}

type BackupUser = {
  lastBackup: Date,
  backupLocation: string
}

const joeAdmin: User & Admin = {
  _id: 1,
  email: 'joe.admin@example.com',
  token: '12345',
  accessPages: ['adminConsole', 'userReset'],
  lastLogin: new Date()
};

const janeOps: User & BackupUser = {
  _id: 2,
  email: 'jane.ops@example.com',
  token: '67890',
  backupLocation: './backups/last-backup',
  lastBackup: new Date()
};

console.log(joeAdmin);
console.log(janeOps);
