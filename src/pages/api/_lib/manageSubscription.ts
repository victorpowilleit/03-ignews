import {query as q} from 'faunadb'
import { fauna } from "../../../services/fauna"
import { stripe } from '../../../services/stripe'

export async function saveSubscription(subscriptionId:string, customerId:string, createAction = false){
  //Buscar usuário no banco do FaunaDB com o ID de CustomerID
  const userRef =  await fauna.query(
    q.Select("ref", q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
  )
  //Buscar a Subscription pelo ID
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  //--------------------------------
  const subscriptionData={
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }
  //Salvar od dados da subscription no FaunaDB
  await fauna.query(
    q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    // q.Replace(q.Ref(q.Collection('subscriptions'), "301858999502897664"), {data: subscriptionData})
    //q.Replace(q.Ref(q.Collection("subscriptions"),"301858999502897664"), {data: subscriptionData})
    
    // q.If(q.Not(q.Exists(q.Match(q.Index('subscription_by_user_id', q.Casefold(subscriptionData.userId))))),
    // q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
    // q.Replace(q.Select("ref",q.Get(q.Match(q.Index('subscription_by_user_id', q.Casefold(subscriptionData.userId))))), {data: subscriptionData}))
    )

  // if(createAction){
  //   console.log('Gravando subscription')
  //   await fauna.query(
  //     q.If(q.Not(q.Exists(q.Match(q.Index('subscription_by_id', q.Casefold(subscriptionId))))),
  //     q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
  //     q.Replace(q.Select("ref",q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {data: subscriptionData}))
  //     // q.Create(q.Collection('subscriptions'), { data: subscriptionData })
  //     )
  // }else{
  //   console.log('Atualizando Subscription')
  //   await fauna.query(
  //     // q.Replace(q.Select("ref",q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {data: subscriptionData})
  //     q.Create(q.Collection('subscriptions'), { data: subscriptionData })
  //   )
  // }
}