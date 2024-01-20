import { useQuery } from '@tanstack/react-query'
import { UtensilsCrossed } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'days-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação à ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação à ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
