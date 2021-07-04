import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";
console.log('webhooks page loaded')

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

console.log("Relevant Events Created")

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log("POST recognized")
    const buf = await buffer(req)
    const secret = req.headers['stripe-signature']

    // console.log(buf)

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.log("error 01")
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    const { type } = event

    if (relevantEvents.has(type)) {
      console.log('Evento recebido:', event)
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            console.log("UPDATE SUBSCRIPTION")
            const subscription = event.data.object as Stripe.Subscription
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            )
            break
          case 'checkout.session.completed':
          case 'customer.subscription.created':
            console.log("CREATE SUBSCRIPTION")
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            )
            break
          default:
            throw new Error('Unhandled event.')
        }
      } catch (err) {
        //sentry, bugsnag
        return res.json({ error: 'Webhook handler failed' })
      }
    }
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end("Method not allowed")
  }
}