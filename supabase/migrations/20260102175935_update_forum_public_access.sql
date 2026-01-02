/*
  # Update Forum for Public Access

  1. Changes
    - Update RLS policies to allow public read access to forum content
    - Allow anonymous users to view profiles, topics, and posts
    - Maintain existing restrictions for creating/updating/deleting content (authenticated users only)

  2. Security
    - Public can read forum content (profiles, topics, posts)
    - Only authenticated users can create, update, or delete content
    - Users can only modify their own content
*/

-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Topics are viewable by authenticated users" ON forum_topics;
DROP POLICY IF EXISTS "Posts are viewable by authenticated users" ON forum_posts;

-- Create new public SELECT policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Topics are viewable by everyone"
  ON forum_topics FOR SELECT
  USING (true);

CREATE POLICY "Posts are viewable by everyone"
  ON forum_posts FOR SELECT
  USING (true);