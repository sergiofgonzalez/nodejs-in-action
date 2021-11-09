import bcrypt from 'bcrypt';


export async function generateSalt(): Promise<string> {
  const salt = await bcrypt.genSalt();
  return salt;
}
