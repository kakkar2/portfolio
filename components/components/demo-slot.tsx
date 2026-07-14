import fs from 'fs'
import path from 'path'

import { HighlightedCode } from '../registry/highlighted-code'
import { CopyButton } from '../ui/copy-button'

export async function DemoSlot({ slug }: { slug: string }) {
  const demoPath = path.join(process.cwd(), 'registry/examples', `${slug}-demo.tsx`)
  const code = fs.existsSync(demoPath) ? fs.readFileSync(demoPath, 'utf-8').trimEnd() : ''

  if (!code) return null

  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton
          value={code}
          label="Copy"
          copiedLabel="Copied"
          size={13}
          className={[
            'h-7 w-7 rounded-md border border-border',
            'bg-background/90 backdrop-blur-sm',
          ].join(' ')}
        />
      </div>
      <HighlightedCode code={code} lang="tsx" />
    </div>
  )
}
