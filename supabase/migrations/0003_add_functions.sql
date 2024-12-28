-- Function to get current streak days
CREATE OR REPLACE FUNCTION get_current_streak_days(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_start TIMESTAMPTZ;
  last_check_in TIMESTAMPTZ;
  days INTEGER;
BEGIN
  -- Get the active streak's start date
  SELECT start_date INTO streak_start
  FROM streaks
  WHERE streaks.user_id = $1
    AND is_active = true
  ORDER BY created_at DESC
  LIMIT 1;

  -- Get the last check-in date
  SELECT created_at INTO last_check_in
  FROM check_ins
  WHERE check_ins.user_id = $1
  ORDER BY created_at DESC
  LIMIT 1;

  -- Calculate days
  IF streak_start IS NULL THEN
    RETURN 0;
  ELSE
    SELECT EXTRACT(DAY FROM (COALESCE(last_check_in, NOW()) - streak_start))::INTEGER INTO days;
    RETURN days;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has checked in today
CREATE OR REPLACE FUNCTION has_checked_in_today(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  last_check_in TIMESTAMPTZ;
BEGIN
  SELECT created_at INTO last_check_in
  FROM check_ins
  WHERE check_ins.user_id = $1
  ORDER BY created_at DESC
  LIMIT 1;

  RETURN (
    last_check_in IS NOT NULL AND
    DATE_TRUNC('day', last_check_in) = DATE_TRUNC('day', NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
