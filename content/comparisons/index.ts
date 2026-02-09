import { CompetitorData, CompetitorSummary } from './types';
import { hubstaffData } from './hubstaff';
import { timeDoctorData } from './time-doctor';
import { clockifyData } from './clockify';
import { togglData } from './toggl';

export const competitors: Record<string, CompetitorData> = {
  hubstaff: hubstaffData,
  'time-doctor': timeDoctorData,
  clockify: clockifyData,
  toggl: togglData,
};

export function getCompetitorBySlug(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitors(): CompetitorData[] {
  return Object.values(competitors);
}

export function getCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}

export function getCompetitorSummaries(): CompetitorSummary[] {
  return getAllCompetitors().map((competitor) => ({
    slug: competitor.slug,
    name: competitor.name,
    tagline: competitor.tagline,
    logo: competitor.logo,
    shortDescription: competitor.description.slice(0, 150) + '...',
  }));
}

export type { CompetitorData, CompetitorSummary } from './types';
