import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "db.json");

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          message: "Username must be alphanumeric (underscores/dashes allowed)",
        },
        { status: 400 }
      );
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password is too weak. Must include letters, numbers, and symbols (@$!%*#?&)",
        },
        { status: 400 }
      );
    }

    const fileData = fs.readFileSync(dbPath, "utf-8");
    const allUsers = JSON.parse(fileData || "[]");

    if (allUsers.some((u) => u.email === email)) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = { id: Date.now(), username, email, password };
    allUsers.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(allUsers, null, 2));

    return NextResponse.json(
      { message: "User created successfully", user: { username, email } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
