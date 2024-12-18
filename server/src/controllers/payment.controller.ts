import { Request, Response } from "express";
import Stripe from "stripe";
import User, { IUser } from "../models/user.model";
import { sendPremiumConfirmationEmail } from "../services/email.service";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-09-30.acacia",
})

export const createCheckoutSession = async(req:Request, res:Response) => {
    const user = req.user as any
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "Lifetime subscription",
                        },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                }
            ],
            customer_email: user.email,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            client_reference_id: user._id.toString(),

        });

        res.json({ sessionId: session.id });

    } catch (error) {
console.error(error)
res.status(500).json({error: "failed to create charge"})
    }
}


export const handleWebhook = async(req:Request, res:Response) => {
    const signature = req.headers["stripe-signature"] as string

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

    } catch(error: any) {
console.error(error)
res.status(400).send(`Webhook Error: ${error.message}`)
return;
    }

    if(event.type === "checkout.session.completed") {
        const session =event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id


        if(userId) {
            const user = await User.findByIdAndUpdate(userId,
                {isPremium: true},
                {new: true}
            )

            if(user && user.email) {
                await sendPremiumConfirmationEmail(user.email, user.displayName)
            }
        }
    }


  res.json({received: true});

}


export const getPremiumStatus = async(req:Request, res:Response) => {
    const user = req.user as IUser

    if(user.isPremium) {
        res.json({status: "active"})
    } else {
       res.json({status: "inactive"})
    }
}