import { supabase } from "./supabase";

export async function createStreak() {
  const { data, error } = await supabase
    .from("streaks")
    .insert([{}])
    .select()
    .single();
  return { data, error };
}

export async function getCurrentStreak() {
  const { data, error } = await supabase
    .from("streaks")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return { data, error };
}

export async function createCheckIn(
  streakId: string,
  mood: string,
  journalEntry?: string,
) {
  const { data, error } = await supabase
    .from("check_ins")
    .insert([
      {
        streak_id: streakId,
        mood,
        journal_entry: journalEntry,
      },
    ])
    .select()
    .single();
  return { data, error };
}

export async function getCheckIns(streakId: string) {
  const { data, error } = await supabase
    .from("check_ins")
    .select("*")
    .eq("streak_id", streakId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getGoals() {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function endStreak(streakId: string) {
  const { data, error } = await supabase
    .from("streaks")
    .update({ is_active: false, end_date: new Date().toISOString() })
    .eq("id", streakId)
    .select()
    .single();
  return { data, error };
}
