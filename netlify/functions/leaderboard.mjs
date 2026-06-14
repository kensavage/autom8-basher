import { connectLambda, getStore } from '@netlify/blobs';

const STORE_NAME = 'ninja-basher-leaderboard';
const SCORES_KEY = 'scores-v1';
const MAX_ENTRIES = 200;
const PUBLIC_LIMIT = 25;
let memoryScores = [];

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
  'content-type': 'application/json',
  'cache-control': 'no-store',
};

function response(statusCode, body) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

function cleanName(name) {
  const n = String(name || '').replace(/[^\w .-]/g, '').trim().slice(0, 16);
  return n || 'Shadow';
}

function cleanDifficulty(value) {
  return ['casual', 'normal', 'hard', 'impossible'].includes(value) ? value : 'normal';
}

function asInt(value, min, max) {
  const n = Math.round(Number(value) || 0);
  return Math.max(min, Math.min(max, n));
}

function publicEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    difficulty: entry.difficulty,
    character: entry.character,
    score: entry.score,
    time: entry.time,
    level: entry.level,
    kills: entry.kills,
    bossKills: entry.bossKills,
    evolved: entry.evolved,
    relics: entry.relics,
    won: entry.won,
    createdAt: entry.createdAt,
  };
}

async function readScores(event) {
  try {
    connectLambda(event);
    const store = getStore(STORE_NAME);
    const stored = await store.get(SCORES_KEY, { type: 'json' });
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return memoryScores;
  }
}

async function writeScores(event, scores) {
  const trimmed = scores
    .sort((a, b) => b.score - a.score || b.time - a.time || b.createdAt.localeCompare(a.createdAt))
    .slice(0, MAX_ENTRIES);
  memoryScores = trimmed;
  try {
    connectLambda(event);
    const store = getStore(STORE_NAME);
    await store.setJSON(SCORES_KEY, trimmed);
  } catch (error) {
    // Local development without Netlify Blobs keeps using the in-memory list.
  }
  return trimmed;
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };

  if (event.httpMethod === 'GET') {
    const scores = await readScores(event);
    const difficulty = cleanDifficulty(event.queryStringParameters?.difficulty);
    const filtered = scores
      .filter(entry => entry.difficulty === difficulty)
      .sort((a, b) => b.score - a.score || b.time - a.time || b.createdAt.localeCompare(a.createdAt))
      .slice(0, PUBLIC_LIMIT)
      .map((entry, index) => ({ rank: index + 1, ...publicEntry(entry) }));
    return response(200, { difficulty, scores: filtered });
  }

  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' });

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return response(400, { error: 'Invalid JSON' });
  }

  const entry = {
    id: crypto.randomUUID(),
    name: cleanName(body.name),
    difficulty: cleanDifficulty(body.difficulty),
    character: String(body.character || 'SHADOW').slice(0, 18),
    score: asInt(body.score, 0, 9999999),
    time: asInt(body.time, 0, 3600),
    level: asInt(body.level, 1, 999),
    kills: asInt(body.kills, 0, 99999),
    bossKills: asInt(body.bossKills, 0, 99),
    evolved: asInt(body.evolved, 0, 20),
    relics: asInt(body.relics, 0, 99),
    gold: asInt(body.gold, 0, 999999),
    won: !!body.won,
    createdAt: new Date().toISOString(),
  };

  if (entry.score <= 0 || entry.time <= 0) return response(422, { error: 'Score and time are required' });

  const scores = await readScores(event);
  const saved = await writeScores(event, [...scores, entry]);
  const sameDifficulty = saved
    .filter(item => item.difficulty === entry.difficulty)
    .sort((a, b) => b.score - a.score || b.time - a.time || b.createdAt.localeCompare(a.createdAt));
  const rank = sameDifficulty.findIndex(item => item.id === entry.id) + 1;

  return response(200, { rank, entry: publicEntry(entry) });
};
