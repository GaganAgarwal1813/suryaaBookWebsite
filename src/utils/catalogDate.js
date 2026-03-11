export const FULL_CATALOG_DATE = new Date(2026, 6, 1); // July 1, 2026

export const isFullCatalogActive = () => Date.now() >= FULL_CATALOG_DATE.getTime();
