import { Paths } from "@/routes/paths";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  dynamic?: boolean;
}

export interface BreadcrumbConfig {
  items: BreadcrumbItem[];
}

// Helper to build dynamic route patterns
const dynamicPaths = {
  loan: (id = '[loanId]') => `${Paths.dashboard.loans.root}/${id}`,
  // Add other dynamic paths here as needed
} as const;

export const BREADCRUMB_CONFIGS: Record<string, BreadcrumbConfig> = {
  [Paths.dashboard.root]: {
    items: [
      { label: 'Dashboard', href: Paths.dashboard.root }
    ]
  },
  [Paths.dashboard.loans.root]: {
    items: [
      { label: 'Dashboard', href: Paths.dashboard.root },
      { label: 'Loans', href: Paths.dashboard.loans.root }
    ]
  },
  [dynamicPaths.loan()]: {
    items: [
      { label: 'Dashboard', href: Paths.dashboard.root },
      { label: 'Loans', href: Paths.dashboard.loans.root },
      { label: 'Loan Details', dynamic: true }
    ]
  },
};

// Type to extract valid breadcrumb paths
export type ValidBreadcrumbPaths = keyof typeof BREADCRUMB_CONFIGS;

// Helper function to check if a path has a breadcrumb config
export function hasBreadcrumbConfig(path: string): path is ValidBreadcrumbPaths {
  return path in BREADCRUMB_CONFIGS;
}

// Helper function to get dynamic path pattern
export function getDynamicPathPattern(path: string): RegExp {
  return new RegExp(`^${path.replace(/\[.*?\]/g, '[^/]+')}$`);
}

// Helper function to find matching breadcrumb config
export function findMatchingConfig(pathname: string): BreadcrumbConfig | undefined {
  // First try exact match
  if (hasBreadcrumbConfig(pathname)) {
    return BREADCRUMB_CONFIGS[pathname];
  }

  // Then try matching dynamic patterns
  const configKey = Object.keys(BREADCRUMB_CONFIGS).find(key =>
    getDynamicPathPattern(key).test(pathname)
  );

  return configKey ? BREADCRUMB_CONFIGS[configKey] : undefined;
}
