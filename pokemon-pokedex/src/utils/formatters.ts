export const toDisplayName = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatHeight = (height: number) => `${(height / 10).toFixed(1)} m`;

export const formatWeight = (weight: number) => `${(weight / 10).toFixed(1)} kg`;
