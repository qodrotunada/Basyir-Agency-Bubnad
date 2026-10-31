import { describe, expect, it } from 'vitest';
import { ALL_EPISODE_IDS, CASES_CONFIG } from '../data/campaign.js';
import { createInitialState, gameReducer } from './game.js';

const expectedPuzzleSentences = {
  'ch01-shopping': 'سِعْرُ اللَّحْمِ مِائَةُ أَلْفِ رُوبِيَّةٍ لِلْكِيلُو الْوَاحِدِ',
  'ch02-health': 'ذَهَبَ مُحَمَّدٌ إِلَى الْمُسْتَشْفَى لِلْفَحْصِ',
  'ch03-travel': 'سَافَرَ فَاتِحٌ إِلَى إِنْدُونِيسِيَا يَوْمَ الْأَحَدِ بِالطَّائِرَةِ',
  'ch04-hajj-umrah': 'طَافَ سَالِمٌ حَوْلَ الْكَعْبَةِ سَبْعَةَ أَشْوَاطٍ',
  'ch05-ict': 'الْجَوَّالُ الذَّكِيُّ يُسَاعِدُنَا عَلَى الِاتِّصَالِ بِالْأَهْلِ وَالْأَصْدِقَاءِ',
  'ch06-religions': 'يُصَلِّي الْمُسْلِمُونَ فِي الْمَسَاجِدِ'
};

describe('Arabic answer-key audit', () => {
  it('reconstructs the verified Arabic sentence for every chapter puzzle', () => {
    for (const episodeId of ALL_EPISODE_IDS) {
      const puzzle = CASES_CONFIG[episodeId].puzzle;
      const acceptedOrder = puzzle.acceptedOrders[0];
      const sentence = acceptedOrder
        .map((pieceId) => puzzle.pieces.find((piece) => piece.id === pieceId)?.textArabic)
        .join(' ');
      expect(sentence, episodeId).toBe(expectedPuzzleSentences[episodeId]);
    }
  });

  it('accepts the published correct order for all six chapters', () => {
    for (const episodeId of ALL_EPISODE_IDS) {
      const caseData = CASES_CONFIG[episodeId];
      const acceptedOrder = caseData.puzzle.acceptedOrders[0];
      const state = {
        ...createInitialState(caseData),
        phase: 'puzzle',
        foundEvidenceIds: caseData.evidence.map((item) => item.id),
        puzzleOrder: acceptedOrder.slice()
      };
      const result = gameReducer(state, { type: 'SUBMIT_PUZZLE' }, caseData);
      expect(result.isPuzzleSolved, episodeId).toBe(true);
      expect(result.feedback?.kind, episodeId).toBe('success');
    }
  });

  it('checks every checkpoint correctIndex against its option list', () => {
    for (const episodeId of ALL_EPISODE_IDS) {
      for (const question of CASES_CONFIG[episodeId].mastery) {
        expect(Number.isInteger(question.correctIndex), `${episodeId}:${question.id}`).toBe(true);
        expect(question.correctIndex, `${episodeId}:${question.id}`).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex, `${episodeId}:${question.id}`).toBeLessThan(question.options.length);
        expect(String(question.options[question.correctIndex] ?? '').trim(), `${episodeId}:${question.id}`).not.toBe('');
      }
    }
  });

  it('uses the corrected clinic visit sequence in both Bab 2 activities', () => {
    const caseData = CASES_CONFIG['ch02-health'];
    const activities = caseData.learningPath.flatMap((section) => section.activities);
    const expected = 'Ambil nomor antrean → registrasi → tunggu panggilan → ruang dokter.';
    const qiraahSequence = activities.find((item) => item.type === 'sequence-steps');
    const missionSequence = activities.find((item) => item.prompt === 'Susun urutan kunjungan berdasarkan dialog.');
    expect(qiraahSequence?.expectedAnswer).toBe(expected);
    expect(missionSequence?.expectedAnswer).toBe(expected);
  });

  it('restores the initial scrambled order when the reset control is used', () => {
    const caseData = CASES_CONFIG['ch01-shopping'];
    const state = {
      ...createInitialState(caseData),
      phase: 'puzzle',
      puzzleOrder: ['p1', 'p2', 'p3', 'p4']
    };
    const result = gameReducer(state, { type: 'RESET_PUZZLE_ORDER' }, caseData);
    expect(result.puzzleOrder).toEqual(caseData.puzzle.initialOrder);
  });

  it('shows the expected answer in Indonesian after an incorrect puzzle submission', () => {
    const caseData = CASES_CONFIG['ch01-shopping'];
    const state = {
      ...createInitialState(caseData),
      phase: 'puzzle',
      foundEvidenceIds: caseData.evidence.map((item) => item.id),
      puzzleOrder: ['p3', 'p4', 'p1', 'p2']
    };
    const result = gameReducer(state, { type: 'SUBMIT_PUZZLE' }, caseData);
    expect(result.isPuzzleSolved).toBe(false);
    expect(result.feedback.message).toContain('harga daging → seratus ribu rupiah → untuk setiap kilogram → satu');
  });
});
