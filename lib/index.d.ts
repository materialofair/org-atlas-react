import type { ReactElement, ReactNode } from 'react'

export interface Department {
  /** Stable identifier, unique within one organization tree. */
  id: string
  name: string
  leader?: string | null
  description?: string | null
  children?: readonly Department[]
}

export type OrgTheme = 'light' | 'dark' | 'system'

export interface OrgExplorerProps {
  root: Department
  /** The organizational level of root, counting from 1. Defaults to 1. */
  rootLevel?: number
  title?: string
  selectedId?: string
  onNavigate?: (department: Department) => void
  getHref?: (department: Department) => string
  theme?: OrgTheme
  className?: string
  toolbar?: ReactNode
}

export declare function OrgExplorer(props: OrgExplorerProps): ReactElement
