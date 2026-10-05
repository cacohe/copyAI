-- Drop leftover user mirror table; auth users live in Clerk.
DROP TABLE IF EXISTS "user_profiles";

-- Drop unused title column; history uses topic as the display heading.
ALTER TABLE "generated_contents" DROP COLUMN IF EXISTS "title";
