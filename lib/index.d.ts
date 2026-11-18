import type { ReactElement, ReactNode } from 'react'

export type BackendIconName =
  | 'it-team' | 'factory-software' | 'data-pipeline' | 'industrial-iot'
  | 'operations-team' | 'ops-dispatch' | 'shift-roster' | 'ops-kpi'
  | 'equipment-capex' | 'risk-fmea' | 'quality-return'
  | 'change-review' | 'safety-drill' | 'smart-factory-ai'
  | 'buddy' | 'new-hire' | 'equipment-technician' | 'quality-inspector'
  | 'staffing-fill' | 'absence-rate' | 'training-hours' | 'cross-skill'
  | 'rework-rate' | 'wip-level' | 'mean-repair-time' | 'mean-failure-interval'
  | 'team-leader' | 'successor' | 'mentor'
  | 'shift-leader' | 'fab-operator' | 'process-engineer'
  | 'attrition-rate' | 'retention-rate' | 'headcount'
  | 'succession-coverage' | 'qualification-rate' | 'overtime-rate'
  | 'equipment-oee' | 'first-pass-yield' | 'scrap-rate'
  | 'cycle-time' | 'units-per-hour' | 'on-time-delivery'
  | 'backend-overview' | 'package' | 'wafer' | 'dicing' | 'bump' | 'attach'
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
  | 'external-assembly' | 'module-fa' | 'qms' | 'supply-planning'
  | 'bottleneck-control' | 'unit-cost' | 'sample-delivery' | 'osat-sourcing'
  | 'safety-stock' | 'fifo-lanes' | 'incoming-coa' | 'anomaly-monitor'
  | 'tester-control' | 'defect-classifier' | 'hbm-schedule' | 'production-progress'
  | 'test-tat' | 'mobile-package-test' | 'soc-program' | 'hbm-stack-test'
  | 'package-section' | 'package-design' | 'material-qualification' | 'equipment-throughput'
  | 'test-load-split' | 'order-due-date' | 'vendor-onboarding' | 'vendor-scorecard'
  | 'contract-review' | 'invoice-match' | 'dc-parametric' | 'margin-window'
  | 'wafer-repair' | 'wafer-burn-in' | 'ball-attach' | 'dram-array-test'
  | 'wafer-mount' | 'uv-tape-release' | 'die-pick' | 'epoxy-dispense' | 'die-attach-cure'
  | 'plasma-clean' | 'post-mold-cure' | 'lead-plating' | 'trim-form' | 'solder-reflow'
  | 'package-singulation' | 'laser-mark' | 'xray-inspection' | 'acoustic-microscopy' | 'dry-pack'
  | 'module-layout'
  | 'materials-roadmap' | 'temporary-bond-film' | 'carrier-substrate' | 'wafer-reconstitution'
  | 'die-shift' | 'wafer-warpage' | 'experiment-matrix' | 'test-architecture'
  | 'pattern-debug' | 'probe-card' | 'equipment-standard' | 'site-loading'
  | 'build-signal' | 'global-at-network'
  | 'cis-test' | 'rf-test' | 'mixed-signal-test' | 'display-driver'
  | 'mems-test' | 'test-correlation' | 'platform-conversion' | 'load-board'
  | 'test-socket' | 'strip-handler' | 'parameter-compensation' | 'efab-data'
export declare function getDepartmentIcon(node: Department): BackendIconName
export declare const backendIcons: Readonly<Record<BackendIconName, { readonly name: string; readonly group: string; readonly description: string; readonly path: string }>>
export declare function BackendIcon(props: { name: BackendIconName; color?: string; size?: number; strokeWidth?: number; label?: string; className?: string }): ReactElement | null

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
  brandMark?: ReactNode
  toolbar?: ReactNode
}

export declare function OrgExplorer(props: OrgExplorerProps): ReactElement

export type OverviewPosition = 'top' | 'upper-left' | 'middle-left' | 'lower-left' | 'upper-right' | 'middle-right' | 'lower-right'

export interface OverviewItem {
  readonly position?: OverviewPosition
  readonly label: string
  readonly icon: BackendIconName
}
export declare const defaultOverviewItems: readonly OverviewItem[]
export interface BackendOverviewProps {
  /** Four to seven peripheral items. Defaults to five. */
  items?: readonly OverviewItem[]
  centerIcon?: BackendIconName
  color?: string
  className?: string
  label?: string
}
export declare function BackendOverview(props: BackendOverviewProps): ReactElement
export type ProductionCollection = 'process' | 'samsung' | 'hynix' | 'cxmt' | 'micron' | 'micron-hq' | 'kyec'
interface IconSection {
  readonly name: string
  readonly source: string
  readonly icons: readonly BackendIconName[]
}
export declare const productionCollections: Readonly<Record<ProductionCollection, {
  readonly name: string
  readonly sections: readonly IconSection[]
  /** Original groups before deduplication, for region or source searches. */
  readonly sourceSections?: readonly IconSection[]
}>>

export type IconExportFormat = 'png' | 'jpg' | 'svg' | 'jsx'
export interface IconExportOptions {
  /** Integer output width and height, 1–2048 px. Default 24. */
  size?: number
  /** Stroke in viewBox units, above 0 and at most 6. Default 1.55. */
  strokeWidth?: number
  /** Six-digit hex color or currentColor (default). */
  color?: string
  /** Six-digit hex to resolve currentColor for raster output. Default black. */
  themeColor?: string
  /** Raster background in six-digit hex. Defaults to transparent PNG or white JPG. */
  background?: string
}
export declare function getIconSource(name: BackendIconName, format: 'svg' | 'jsx', options?: IconExportOptions): string
export declare function exportIcon(name: BackendIconName, format: IconExportFormat, options?: IconExportOptions): Promise<Blob>
