// app/api/user/login/route.js
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "db.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const allUsers = JSON.parse(fileData || "[]");

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
