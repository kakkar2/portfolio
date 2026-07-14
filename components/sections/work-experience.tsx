'use client'

import { IconBriefcase, IconBuildingSkyscraper, IconInfinity } from '@tabler/icons-react'
import { differenceInMonths, parse } from 'date-fns'
import Image from 'next/image'
import { useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from '@/components/icon/chevrons-up-down-icon'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import type { ExperienceItem, ExperiencePosition } from '@/data/experience'
import { cn } from '@/lib/utils'

interface WorkExperienceProps {
  className?: string
  experiences: ExperienceItem[]
}

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn('bg-background text-foreground', className)}>
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </div>
  )
}

// ─── Company row

function ExperienceItem({ experience }: { experience: ExperienceItem }) {
  return (
    <div className="space-y-4 py-4">
      {/* Company header */}
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt=""
              aria-hidden="true"
              className="size-6 rounded-full object-cover"
            />
          ) : (
            <IconBuildingSkyscraper size={16} aria-hidden="true" />
          )}
        </div>

        <h3 className="text-base font-semibold leading-snug">
          {experience.companyWebsite ? (
            <a
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {/* Current employer pulse */}
        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center" aria-label="Current employer">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      {/* Positions — vertical line on the left */}
      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}

// ─── Position row (collapsible)

function ExperiencePositionItem({ position }: { position: ExperiencePosition }) {
  const chevronsRef = useRef<ChevronsUpDownIconHandle>(null)

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      chevronsRef.current?.startAnimation()
    } else {
      chevronsRef.current?.stopAnimation()
    }
  }, [])

  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!position.description}
      asChild
    >
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger
          className={cn(
            'group/position block w-full select-none text-left',
            'relative before:absolute before:-inset-y-1.5 before:-right-1 before:left-7',
            'before:rounded-lg hover:before:bg-muted/40 before:transition-colors',
            'data-disabled:before:content-none data-disabled:cursor-default'
          )}
        >
          <div className="relative z-10 mb-1 flex items-start gap-3 text-sm">
            <div
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-lg',
                'border border-muted-foreground/15 bg-background text-foreground',
                'ring-1 ring-border ring-offset-1 ring-offset-background'
              )}
            >
              <IconBriefcase size={14} aria-hidden="true" />
            </div>

            <span className="flex-1 font-medium text-foreground">{position.title}</span>

            {position.description && (
              <ChevronsUpDownIcon
                ref={chevronsRef}
                duration={0.15}
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              />
            )}
          </div>

          <dl className="relative z-10 flex items-center gap-2 pl-9 text-xs text-muted-foreground">
            {position.employmentType && (
              <>
                <div>
                  <dt className="sr-only">Employment type</dt>
                  <dd>{position.employmentType}</dd>
                </div>
                <Separator orientation="vertical" className="h-3 self-center" />
              </>
            )}

            <div>
              <dt className="sr-only">Employment period</dt>
              <dd className="flex items-center gap-0.5 tabular-nums">
                <span>{start}</span>
                <span className="px-0.5 font-mono">—</span>
                {isOngoing ? (
                  <IconInfinity size={13} className="translate-y-px" aria-label="Present" />
                ) : (
                  <span>{end}</span>
                )}
              </dd>
            </div>

            {duration && (
              <>
                <Separator orientation="vertical" className="h-3 self-center" />
                <div>
                  <dt className="sr-only">Duration</dt>
                  <dd className="tabular-nums">{duration}</dd>
                </div>
              </>
            )}
          </dl>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {position.description && (
            <div
              className={cn(
                'prose prose-sm max-w-none dark:prose-invert pt-2 pl-9',
                'prose-ul:my-1.5 prose-li:my-0.5 prose-li:text-muted-foreground',
                'prose-p:text-muted-foreground prose-p:my-1'
              )}
            >
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </div>
          )}
        </CollapsibleContent>

        {position.skills && position.skills.length > 0 && (
          <ul aria-label="Technologies used" className="flex flex-wrap gap-1.5 pt-3 pl-9">
            {position.skills.map((skill) => (
              <li key={skill}>
                <span className="inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Collapsible>
  )
}

// ─── Duration helpers

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes('.')
  const endHasMonth = end ? end.includes('.') : true

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    return years <= 0 ? '' : `${years}y`
  }

  const startDate = parsePeriodDate(start, 'first')
  const endDate = end ? parsePeriodDate(end, 'last') : new Date()

  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) return ''
  if (totalMonths < 12) return `${totalMonths}m`

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return months === 0 ? `${years}y` : `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallback: 'first' | 'last'): Date {
  if (str.includes('.')) return parse(str, 'MM.yyyy', new Date())
  const month = fallback === 'last' ? '12' : '01'
  return parse(`${month}.${str}`, 'MM.yyyy', new Date())
}
