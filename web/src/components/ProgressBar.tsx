import clsx from 'clsx'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  const progressStyles = {
    width: `${props.progress}%`
  }
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        role='progressbar'
        aria-label='Progresso do hábitos já concluídos nesse dia'
        aria-valuenow={props.progress}
        className={clsx('h-3 rounded-xl bg-green-500 transition-all', {
          'bg-red-600 border-red-500': props.progress === 0,
          'bg-orange-600 border-orange-500': props.progress > 0 && props.progress < 20,
          'bg-orange-400 border-orange-300': props.progress >= 20 && props.progress < 40,
          'bg-yellow-500 border-yellow-400': props.progress >= 40 && props.progress < 60,
          'bg-cyan-600 border-cyan-500': props.progress >= 60 && props.progress < 80,
          'bg-green-500 border-green-400': props.progress >= 80,
        })}
        style={progressStyles}
      />
    </div>
  )
}