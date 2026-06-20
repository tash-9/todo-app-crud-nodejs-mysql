import { User } from './db.js';
import { validateEmail, validatePassword, validateName } from './validateFunctions.js';

async function userRegistration(name, email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  // Validation
  if (!validateName(name)) {
    console.log('Name cannot be empty.');
    return null;
  }

  if (!validateEmail(normalizedEmail)) {
    console.log('Invalid email format.');
    return null;
  }

  if (!validatePassword(password)) {
    console.log('Password must be at least 4 characters.');
    return null;
  }

  // Check if email already exists
  const existing = await User.findOne({ where: { email: normalizedEmail } });
  if (existing) {
    console.log('Email already exists.');
    return null;
  }

  // Create user
  const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
  console.log('Registration successful!\n');
  return user;
}

async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  // Find user by email
  const user = await User.findOne({ where: { email: normalizedEmail } });

  if (!user) {
    console.log('Invalid email or password.\n');
    return null;
  }

  // Check password
  if (user.password !== password) {
    console.log('Wrong credential\n');
    return null;
  }

  console.log('Login successful!\n');
  return user;
}

export { userRegistration, loginUser };
