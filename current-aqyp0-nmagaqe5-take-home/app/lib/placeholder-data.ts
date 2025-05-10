import type { Contact, Pay, Activity } from './definitions'

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const contacts = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/contacts/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/contacts/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/contacts/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/contacts/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/contacts/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/contacts/balazs-orban.png',
  },
];


function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(): Date {
  const now = new Date()

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0, 0
  )

  const oneYearAgo = new Date(startOfToday)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const endOfYesterday = startOfToday.getTime() - 1

  const ts = randomInt(oneYearAgo.getTime(), endOfYesterday)

  return new Date(ts)
}

export function generatePays(
  contacts: Contact[],
  totalCount = 500   
): Pay[] {
  const pays: Pay[] = []
  const statuses: Pay['status'][] = ['completed', 'pending', 'failed']
  const descriptions = ['Rent', 'Utilities', 'Dinner', 'Gift', 'Subscription']

  for (let i = 1; i <= totalCount; i++) {
    const sender   = contacts[randomInt(0, contacts.length - 1)]
    let receiver   = contacts[randomInt(0, contacts.length - 1)]
    while (receiver.id === sender.id) {
      receiver = contacts[randomInt(0, contacts.length - 1)]
    }

    const d = randomDate()

    pays.push({
      id:          String(i),
      senderId:    sender.id,
      receiverId:  receiver.id,
      amount:      parseFloat((Math.random() * 500).toFixed(2)),
      date:        d.toISOString(),
      status:      statuses[randomInt(0, statuses.length - 1)],
      description: Math.random() < 0.3
        ? descriptions[randomInt(0, descriptions.length - 1)]
        : undefined,
    })
  }

  return pays
}
declare global {
  var __P2P_PAYS__: Pay[] | undefined
}

const pays: Pay[] =globalThis.__P2P_PAYS__ ??=generatePays(contacts)

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const activity: Activity[] = MONTHS.map((month, idx) => {
  const count = pays.filter(p => new Date(p.date).getMonth() === idx).length
  return { month, activity: count }
})

export { users, contacts, pays, activity };
