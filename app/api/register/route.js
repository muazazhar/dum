import user from "@/lib/mongo/modals/user";
import connect from "@/lib/mongo/conection";

import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { username, password } = await req.json
    await connect()
    const existingUser = await user.findOne({ username });

    if (existingUser) {
        return new NextResponse("username is already in use", { status: 400 });
    }

    const newUser = new User({
        username,
        password,
    });
    try {
        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (error) {
        return new NextResponse(error, {
            status: 500
        })
    }
}