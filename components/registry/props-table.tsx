export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropRow[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Prop</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {props.map((prop) => (
            <tr key={prop.name} className="group">
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-xs text-foreground">{prop.name}</code>
                  {prop.required && (
                    <span className="text-[10px] text-red-500" title="Required">
                      *
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs">{prop.type}</code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="font-mono text-xs text-muted-foreground">{prop.default}</code>
                ) : (
                  <span className="text-xs text-muted-foreground/40">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
