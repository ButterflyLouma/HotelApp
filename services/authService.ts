export const login = async (email: string, password: string): Promise<boolean> => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demonstration, any non-empty email/password combination is considered a success
  // In a real app, this would involve actual backend authentication
  if (email && password) {
    return true;
  } else {
    return false;
  }
};