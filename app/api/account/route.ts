import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Account } from "../../types/account";

// Path to the local data file
const dataPath = path.join(process.cwd(), "data", "account.json");

// Helper functions to read and write account data
const readAccounts = (): Account[] => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeAccounts = (accounts: Account[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(accounts, null, 2));
};

// Handle GET request
export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const accounts = readAccounts();

  if (email) {
    const account = accounts.find((acc) => acc.email === email);
    if (account) {
      return NextResponse.json(account);
    }
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  return NextResponse.json(accounts);
}

// Handle POST request (Signup)
export async function POST(req: Request) {
  const accounts = readAccounts();
  const { name, email, password, isgoogle } = await req.json();

  if (!name || !email || (!password && !isgoogle)) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  const existingAccount = accounts.find((acc) => acc.email === email);
  if (existingAccount) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  const newAccount: Account = {
    id: `acc-${Date.now()}`,
    name,
    email,
    password,
    phone: "",
    address: "",
    cart: [],
    wishlist: [],
    orders: [],
    reviews: [],
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  accounts.push(newAccount);
  writeAccounts(accounts);

  return NextResponse.json(newAccount, { status: 201 });
}

// Handle PUT request (Login)
export async function PUT(req: Request) {
  const accounts = readAccounts();
  const { email, password, isgoogle } = await req.json();

  if (!email || (!password && !isgoogle)) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const account = accounts.find(
    (acc) => acc.email === email && (acc.password === password || isgoogle)
  );

  if (account) {
    return NextResponse.json(account);
  }

  return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
}

// Handle PATCH request (Update account)
export async function PATCH(req: Request) {
  const accounts = readAccounts();
  const { email, updates } = await req.json();

  if (!email || !updates) {
    return NextResponse.json(
      { error: "Email and updates are required" },
      { status: 400 }
    );
  }

  const accountIndex = accounts.findIndex((acc) => acc.email === email);

  if (accountIndex === -1) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // Update the account with the new data
  accounts[accountIndex] = {
    ...accounts[accountIndex],
    ...updates,
    updatedAt: new Date().toISOString(), // Optionally track updates
  };

  writeAccounts(accounts);

  return NextResponse.json(accounts[accountIndex]);
}
