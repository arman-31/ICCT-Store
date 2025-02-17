import { NextRequest, NextResponse } from "next/server";
import prisma from "app/lib/prisma"
import { Field } from "mysql2";
import { error } from "console";

export async function POST(req: NextRequest) {
    if (req.method == "POST") {
        try {
            const formData = await req.formData()
            const name = formData.get("name") as string
            const course = formData.get("course") as string
            const year = formData.get("year") as string
            const studentNumber = formData.get("studentNumber") as string
            const paymentProof = formData.get("paymentProof") as File
            const cart = JSON.parse(formData.get("cart") as string)
            
            const paymentProofPath = '/uploads/${Date.now()}_$ {paymentProof.name}'

            console.log('Saving payment proof to ${paymentProofPath}')

            const user = await prisma.user.upsert({
                where: { studentNumber },
                update: { name, course, year },
                create: { name, course, year, studentNumber, email: '${studentNumber}@example.com'}
            })

            const orders = await Promise.all(
                cart.map(async (item: any) => {
                    const product = await prisma.product.findUnique({
                    where: { id: item.id}})
                    if (!product) throw new Error ('Product not found: ${item.id}')
                    
                    const pickupDate = 
                    product.stock > 0 ? null : new Date(Date.now() +
                    (Math.random() < 0.5 ? 15 : 30) * 24 * 60 * 60 * 1000 )

                    return prisma.order.create({
                        data: {
                            userId: user.id,
                            productId: item.id,
                            quantity: 1,
                            size: item.size,
                            totalPrice: item.price,
                            status: "pending",
                            paymentProof: paymentProofPath,
                            pickupDate,
                        },
                    })
                }),
            )

            return NextResponse.json({ success: true, orderId: orders [0].id })
        } catch (error) {
            console.error("Checkout error:", error)
            return NextResponse.json({ success: false, error: "Checkout failed"}, { status: 500})
        }
    }else {
        return NextResponse.json({ error: "Method not allowed" }, {
            status: 405})
    }
}