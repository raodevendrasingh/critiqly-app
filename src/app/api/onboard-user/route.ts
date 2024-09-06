import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

interface UpdateUserData {
	username: string;
	isOnboarded?: boolean;
	name?: string;
	imageUrl?: string;
	tagline?: string;
}

export async function POST(request: Request) {
	await dbConnect();

	const session = await getServerSession(authOptions);

	const user: User = session?.user as User;

	if (!session || !session.user) {
		return Response.json(
			{
				sucess: false,
				message: "User is not logged in",
			},
			{ status: 401 }
		);
	}

	const userId = user._id;

	const { username, name, imageUrl, tagline }: UpdateUserData =
		await request.json();

	try {
		const updatedFields: Partial<UpdateUserData> = {
			...(username?.trim() && { username, isOnboarded: true }),
			...(name?.trim() && { name }),
			...(imageUrl?.trim() && { imageUrl }),
			...(tagline?.trim() && { tagline }),
		};

		const updatedUser = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $set: updatedFields },
			{ new: true }
		);

		if (!updatedUser) {
			return Response.json(
				{
					success: false,
					message: "Error updating user details!",
				},
				{ status: 404 }
			);
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: "User details updated successfully!",
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating user details\n", error);
		return Response.json(
			{
				success: false,
				message: "Error updating user details!",
			},
			{ status: 500 }
		);
	}
}
