function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (!password) {
    return false;
  }

  if (password.length < 4) {
    return false;
  }
  return true;
}

function validateName(name) {
  if (!name) {
    return false;
  }

  return name.trim().length > 0;
}

function validateDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validatePriority(priority) {
  const validPriorities = ['Low', 'Medium', 'High'];
  return validPriorities.includes(priority);
}

function validateStatus(status) {
  const validStatuses = ['Pending', 'Completed'];
  return validStatuses.includes(status);
}

export {
  validateEmail,
  validatePassword,
  validateName,
  validateDate,
  validatePriority,
  validateStatus,
};
