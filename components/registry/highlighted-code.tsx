import * as prettier from 'prettier'
import parserBabel from 'prettier/plugins/babel'
import parserEstree from 'prettier/plugins/estree'
import parserPostcss from 'prettier/plugins/postcss'
import parserTypeScript from 'prettier/plugins/typescript'
import { codeToHtml } from 'shiki'

import { cn } from '@/lib/utils'

interface HighlightedCodeProps {
  code: string
  lang?: string
  className?: string
}

const PRETTIER_OPTIONS = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'es5',
} as const

async function formatCode(code: string, lang: string): Promise<string> {
  try {
    if (['ts', 'tsx', 'typescript'].includes(lang)) {
      return await prettier.format(code, {
        ...PRETTIER_OPTIONS,
        parser: 'typescript',
        plugins: [parserTypeScript, parserEstree],
      })
    }
    if (['js', 'jsx', 'javascript'].includes(lang)) {
      return await prettier.format(code, {
        ...PRETTIER_OPTIONS,
        parser: 'babel',
        plugins: [parserBabel, parserEstree],
      })
    }
    if (['css', 'scss'].includes(lang)) {
      return await prettier.format(code, {
        parser: 'css',
        plugins: [parserPostcss],
      })
    }
  } catch {
    // Invalid syntax or unsupported lang — return original
  }
  return code
}

export async function HighlightedCode({ code, lang = 'tsx', className }: HighlightedCodeProps) {
  const formatted = await formatCode(code.trimEnd(), lang)

  const [lightHtml, darkHtml] = await Promise.all([
    codeToHtml(formatted, { lang, theme: 'one-light' }),
    codeToHtml(formatted, { lang, theme: 'one-dark-pro' }),
  ])

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
