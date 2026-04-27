import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  // Cast or update a vote
  if (method === 'POST') {
    const { sessionId, interviewerName, vote } = req.body;

    // Upsert — update if exists, insert if not
    const { error } = await supabase
      .from('votes')
      .upsert({
        session_id: sessionId,
        interviewer_name: interviewerName,
        vote,
      }, { onConflict: 'session_id,interviewer_name' });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  // Get all votes for a session
  if (method === 'GET') {
    const { sessionId } = req.query;
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('session_id', sessionId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
