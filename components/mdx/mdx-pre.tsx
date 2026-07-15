import type { ComponentProps } from 'react'

import { HighlightedCode } from '@/components/registry/highlighted-code'
import { CopyButton } from '@/components/ui/copy-button'

type PreProps = ComponentProps<'pre'> & {
  children?: React.ReactElement<{ className?: string; children?: string }>
}

const NO_COPY_LANGS = new Set(['text', 'txt'])

export async function MdxPre({ children, ...props }: PreProps) {
  const code = children?.props?.children ?? ''
  const langClass = children?.props?.className ?? ''
  const lang = langClass.replace('language-', '') || 'bash'

  const showCopy = !NO_COPY_LANGS.has(lang)

  return (
    <div className="not-prose relative my-5">
      {showCopy && (
        <div className="absolute right-3 top-3 z-10">
          <CopyButton
            value={typeof code === 'string' ? code : ''}
            label="Copy code"
            copiedLabel="Copied"
            size={13}
            className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
          />
        </div>
      )}
      <HighlightedCode code={typeof code === 'string' ? code.trimEnd() : ''} lang={lang} />
    </div>
  )
}
