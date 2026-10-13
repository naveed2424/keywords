import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';
import { generateDynamicSeoResearch } from '../../src/services/seoEngine';

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // CORS & Methods
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const path = event.path.replace(/\/\.netlify\/functions\/api/, '').replace(/\/api/, '');
  let body: any = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch {
      body = {};
    }
  }

  try {
    if (path === '/ai/keyword-research') {
      const seed = body.keyword || 'blogging';
      const country = body.country || 'United States';
      const language = body.language || 'English';

      if (!aiClient) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(generateDynamicSeoResearch(seed, country, language)),
        };
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze keyword "${seed}". Return clean JSON with overview, keywords array, questions array, clusters array, contentIdeas array, serpAnalysis.`,
        config: { responseMimeType: 'application/json' },
      });

      return {
        statusCode: 200,
        headers,
        body: response.text || '{}',
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'RankPilot Netlify API alive', path }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};
