import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { HabitList } from './HabitList'

import { ProgressBar } from './ProgressBar'

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export function HabitDay({ defaultCompleted=0, amount=0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedProgress = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx('w-10 h-10  border-2  rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-background', {
          'bg-zinc-900 border-zinc-700': completedProgress === 0,
          'bg-red-600 border-red-500': completedProgress > 0 && completedProgress < 20,
          'bg-orange-600 border-orange-500': completedProgress >= 20 && completedProgress < 40,
          'bg-yellow-500 border-yellow-400': completedProgress >= 40 && completedProgress < 60,
          'bg-cyan-600 border-cyan-500': completedProgress >= 60 && completedProgress < 80,
          'bg-green-500 border-green-400': completedProgress >= 80,
        })}  
      />

      <Popover.Portal>
          <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
            <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
            <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

            <ProgressBar progress={completedProgress} />

            <HabitList date={date} onCompletedChange={handleCompletedChanged} />

            <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
          </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
    
  )
}