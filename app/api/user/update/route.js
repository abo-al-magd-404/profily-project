import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "db.json");

export async function PATCH(req) {
  try {
    const { email, newUsername, newPassword } = await req.json();

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { message: "Database file not found" },
        { status: 500 }
      );
    }

    const fileData = fs.readFileSync(dbPath, "utf-8");
    let allUsers = JSON.parse(fileData || "[]");

    const userIndex = allUsers.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (newUsername && !usernameRegex.test(newUsername)) {
      return NextResponse.json(
        { message: "Invalid username format" },
        { status: 400 }
      );
    }

    if (newPassword && !passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { message: "Password is too weak" },
        { status: 400 }
      );
    }

    allUsers[userIndex].username = newUsername || allUsers[userIndex].username;
    allUsers[userIndex].password = newPassword || allUsers[userIndex].password;

    fs.writeFileSync(dbPath, JSON.stringify(allUsers, null, 2));

    return NextResponse.json(
      {
        message: "Profile updated successfully ✔",
        user: {
          username: allUsers[userIndex].username,
          email: allUsers[userIndex].email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
