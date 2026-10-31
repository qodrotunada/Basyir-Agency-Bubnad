import { describe, expect, it } from 'vitest';
import { CASES_CONFIG, ALL_EPISODE_IDS } from '../data/campaign.js';
import { createInitialState, gameReducer } from './game.js';
import { initialCampaignProgress, isEpisodeUnlocked } from './persistence.js';

const caseData = CASES_CONFIG['ch01-shopping'];

describe('game reducer contracts', () => {
  it('ignores evidence actions outside the investigation phase', () => {
    const initial = createInitialState(caseData);
    const next = gameReducer(initial, { type: 'FIND_EVIDENCE', id: 'price' }, caseData);
    expect(next).toBe(initial);
  });

  it('records each evidence ID once', () => {
    let state = gameReducer(createInitialState(caseData), { type: 'START_GAME' }, caseData);
    state = gameReducer(state, { type: 'FIND_EVIDENCE', id: 'price' }, caseData);
    const once = state;
    state = gameReducer(state, { type: 'FIND_EVIDENCE', id: 'price' }, caseData);
    expect(state.foundEvidenceIds).toEqual(['price']);
    expect(state).toBe(once);
  });

  it('does not open the puzzle before all five evidence items are found', () => {
    let state = gameReducer(createInitialState(caseData), { type: 'START_GAME' }, caseData);
    state = gameReducer(state, { type: 'FIND_EVIDENCE', id: 'price' }, caseData);
    expect(gameReducer(state, { type: 'OPEN_PUZZLE' }, caseData).phase).toBe('investigation');
  });

  it('unlocks chapter two only after completion and mastery >= 70', () => {
    const campaign = initialCampaignProgress(ALL_EPISODE_IDS);
    expect(isEpisodeUnlocked(CASES_CONFIG['ch02-health'], ALL_EPISODE_IDS, campaign)).toBe(false);
    campaign.episodes['ch01-shopping'].caseCompleted = true;
    campaign.episodes['ch01-shopping'].bestMasteryScore = 60;
    expect(isEpisodeUnlocked(CASES_CONFIG['ch02-health'], ALL_EPISODE_IDS, campaign)).toBe(false);
    campaign.episodes['ch01-shopping'].bestMasteryScore = 70;
    expect(isEpisodeUnlocked(CASES_CONFIG['ch02-health'], ALL_EPISODE_IDS, campaign)).toBe(true);
  });
});
