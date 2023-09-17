import {NextRequest, NextResponse} from "next/server";

import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: { params: { skillId: string } }) {
    const {proficiency} = await req.json();

    await prisma.skill.update({
        where: {
            id: context.params.skillId
        },
        data: {
            proficiency
        }
    });

    return NextResponse.json({});
}