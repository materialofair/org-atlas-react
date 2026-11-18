import type { ReactElement, ReactNode } from 'react'

export type BackendIconName = 'package' | 'wafer' | 'dicing' | 'bump' | 'attach' | 'bond' | 'mold' | 'stack' | 'finish' | 'probe' | 'ate' | 'reliability' | 'analysis' | 'equipment' | 'planning' | 'materials'
export declare const backendIcons: Readonly<Record<BackendIconName, { readonly name: string; readonly group: string; readonly description: string; readonly path: string }>>
export declare function BackendIcon(props: { name: BackendIconName; size?: number; label?: string; className?: string }): ReactElement | null

export interface Department {
  /** Stable identifier, unique within one organization tree. */
  id: string
  name: string
  icon?: BackendIconName
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
  renderArtwork?: (department: Department) => ReactNode
  toolbar?: ReactNode
}

export declare function OrgExplorer(props: OrgExplorerProps): ReactElement
