import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST' && req.body.action === 'create') {
    const { candidateRef, role, factors, interviewers } = req.body;
    const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        session_id: sessionId,
        candidate_ref: candidateRef,
        role,
        factors,
        interviewers: JSON.stringify(interviewers),
        stage: 'set-stage',
        revealed: false,
        flags: JSON.stringify([]),
      })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ sessionId });
  }

  if (method === 'GET') {
    const { sessionId } = req.query;
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) return res.status(404).json({ error: 'Session not found' });
    return res.status(200).json(data);
  }

  if (method === 'PATCH') {
    const { sessionId, ...updates } = req.body;
    if (updates.flags) updates.flags = JSON.stringify(updates.flags);

    const { error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('session_id', sessionId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
