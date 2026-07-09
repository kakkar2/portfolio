import { codeToHtml } from 'shiki'

import { cn } from '@/lib/utils'

interface HighlightedCodeProps {
  code: string
  lang?: string
  className?: string
}

export async function HighlightedCode({ code, lang = 'tsx', className }: HighlightedCodeProps) {
  const [lightHtml, darkHtml] = await Promise.all([
    codeToHtml(code, { lang, theme: 'vitesse-light' }),
    codeToHtml(code, { lang, theme: 'vitesse-dark' }),
  ])

  //   const preClasses = [
  //     '[&_pre]:overflow-x-auto',
  //     '[&_pre]:px-5 [&_pre]:py-4',
  //     '[&_pre]:text-[13px] [&_pre]:leading-[1.6]',
  //     '[&_code]:font-mono',
  //   ].join(' ')
  const preClasses = [
    '[&_pre]:whitespace-pre-wrap',
    '[&_pre]:overflow-wrap-anywhere',
    '[&_pre]:overflow-x-hidden',
    '[&_pre]:px-5 [&_pre]:py-4',
    '[&_pre]:text-[13px] [&_pre]:leading-[1.6]',
    '[&_code]:font-mono',
  ].join(' ')

  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-border', className)}>
      <div
        className={cn('dark:hidden', preClasses)}
        dangerouslySetInnerHTML={{ __html: lightHtml }}
      />
      <div
        className={cn('hidden dark:block', '[&_pre]:!bg-[#171717]', preClasses)}
        dangerouslySetInnerHTML={{ __html: darkHtml }}
      />
    </div>
  )
}
