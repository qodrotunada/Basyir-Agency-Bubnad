import { describe, expect, it } from 'vitest';
import { CAMPAIGN_CONFIG, CASES_CONFIG, VOCABULARY_REGISTRY } from '../data/campaign.js';
import { validateCampaignConfig } from './configValidator.js';

describe('campaign configuration', () => {
  it('has six chapters with five evidence items, sized scene hit areas, and ten checkpoint questions each', () => {
    expect(validateCampaignConfig(CAMPAIGN_CONFIG, CASES_CONFIG, VOCABULARY_REGISTRY)).toEqual([]);
    for (const chapter of CAMPAIGN_CONFIG.episodeOrder) {
      for (const evidence of CASES_CONFIG[chapter].evidence) {
        expect(evidence.hotspot.width).toBeGreaterThan(0);
        expect(evidence.hotspot.height).toBeGreaterThan(0);
      }
    }
  });
});
