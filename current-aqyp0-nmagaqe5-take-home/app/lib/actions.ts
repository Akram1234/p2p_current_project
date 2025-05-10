'use server'                     // <- this marks everything below as a server action

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { pays } from './placeholder-data'
import type { Pay } from './definitions'

// the shape MUST match your form inputs:
const FormSchema = z.object({
  senderId:    z.string(),
  receiverId:  z.string(),
  amount:      z.coerce.number(),
  date:        z.string(),                       // YYYY‑MM‑DD
  status:      z.enum(['completed','pending','failed']),
  description: z.string().optional(),
})

export async function createPay(formData: FormData) {
  try {
    // parse exactly the fields you declared above:
    const { senderId, receiverId, amount, date, status, description } = FormSchema.parse({
      senderId:    formData.get('senderId'),
      receiverId:  formData.get('receiverId'),
      amount:      formData.get('amount'),
      date:        formData.get('date'),
      status:      formData.get('status'),
      description: formData.get('description'),
    })

    // build your Pay object (including auto‑id + ISO timestamp):
    const newPay: Pay = {
      id:          String(pays.length + 1),
      senderId,
      receiverId,
      amount,
      date:        new Date(date).toISOString(),
      status,
      description,
    }
    console.log("we are here" + newPay);
    pays.push(newPay)
    revalidatePath('/dashboard/pays')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('CreatePay Error:', error)
    throw error
  }
}