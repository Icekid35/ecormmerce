import { Account } from "../types/account";

const API_BASE_URL = "/api/account";

/**
 * Fetches all accounts from the API.
 */
export const fetchAllAccounts = async (): Promise<Account[]> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return response.json();
};

/**
 * Fetches a specific account by email.
 * @param email - The email of the account to fetch.
 */
export const getAccountByEmail = async (email: string): Promise<Account | null> => {
  const response = await fetch(`${API_BASE_URL}?email=${encodeURIComponent(email)}`, {
    method: "GET",
  });

  if (response.status === 404) {
    return null; // Account not found
  }

  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }

  return response.json();
};

/**
 * Signs up a new account.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param password - The password for the account.
 */
export const signup = async (name: string, email: string,isgoogle?:boolean, password?: string): Promise<Account> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password,isgoogle }),
  });

  if(response.status==400){
      const error = await response.json();
      throw new Error(error.error || "email already exists");
  }
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to sign up");
  }
  localStorage.setItem("email",email)

  return response.json();
};

/**
 * Logs in an account.
 * @param email - The email of the user.
 * @param password - The password for the account.
 */
export const login = async (email: string,isgoogle?:boolean, password?: string): Promise<Account> => {
 
    const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password,isgoogle }),
  });

  if (response.status === 401) {
    throw new Error("Invalid email or password");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to log in");
  }

  localStorage.setItem("email",email)
  return response.json();
};

/**
 * Deletes an account by ID (optional utility function).
 * @param id - The ID of the account to delete.
 */
export const deleteAccountById = async (id: string): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete account");
  }
  localStorage.clear()

};

export async function updateAccount(
    email: string,
    updates: Partial<Account>
  ): Promise<Account | { error: string }> {
    const endpoint = "/api/account"; // Replace with the actual API route if different.
  
    if (!email || !updates) {
      throw new Error("Email and updates are required.");
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, updates }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        return { error: error.error || "Failed to update the account." };
      }
  
      const updatedAccount = await response.json();
      return updatedAccount;
    } catch (error) {
      console.error("Error updating account:", error);
      return { error: "An unexpected error occurred." };
    }
  }
  