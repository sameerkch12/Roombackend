import User from '../models/userModel'; // Assuming you're using a Mongoose model

export class UserService {
  // Get all users
  static async getAllUsers() {
    try {
      const users = await User.find(); // Fetch all users from the database
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  // Create a new user
  static async createUser(userData: any) {
    try {
      const newUser = new User(userData); // Create a new user instance
      await newUser.save(); // Save the user to the database
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}
