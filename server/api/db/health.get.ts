import { defineEventHandler } from 'h3'
import { useDrizzle } from '../../utils/drizzle'

export default defineEventHandler(async () => {
  const db = useDrizzle()
  const result = await db.$client`select now() as now`

  return {
    ok: true,
    now: result[0]?.now ?? null,
  }
})
