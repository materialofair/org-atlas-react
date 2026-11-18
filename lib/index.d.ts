import type { ReactElement, ReactNode } from 'react'

export type BackendIconName =
  | 'package' | 'wafer' | 'dicing' | 'bump' | 'attach'
  | 'bond' | 'mold' | 'stack' | 'finish' | 'probe'
  | 'ate' | 'reliability' | 'analysis' | 'equipment' | 'planning'
  | 'materials' | 'grinding' | 'flip-chip' | 'rdl' | 'tsv'
  | 'hbm' | 'underfill' | 'dram' | 'nand' | 'dimm'
  | 'ssd' | 'burn-in' | 'slt' | 'binning' | 'test-solutions'
  | 'characterization' | 'yield-map' | 'process-integration' | 'industrial' | 'manufacturing'
  | 'quality-engineering' | 'ehs' | 'facilities' | 'product-engineering' | 'application-engineering'
  | 'project-management' | 'customer-certification' | 'traceability' | 'optical' | 'metrology'
  | 'npi' | 'thermal-cycle' | 'fan-out'
  | 'org-unit' | 'team' | 'project' | 'support' | 'coordination' | 'workcell'
  | 'capacity-model' | 'lot-flow' | 'process-transfer' | 'test-coverage' | 'quality-release' | 'fab-utilities'
  | 'water-systems' | 'power-systems' | 'gas-systems' | 'air-systems'
  | 'die-recovery' | 'post-electrical' | 'module-assembly' | 'module-test'
  | 'warehouse' | 'outbound-logistics' | 'equipment-auto' | 'equipment-commission'
  | 'equipment-alarm' | 'downtime' | 'shift-handover' | 'plasma-grind'
  | 'sustainability-coe' | 'mobile-dram' | 'line-expansion' | 'production-supervision'
export declare function getDepartmentIcon(node: Department): BackendIconName
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
  itemLabel?: string
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
