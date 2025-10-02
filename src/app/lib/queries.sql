-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  content TEXT
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  post_id INT NOT NULL REFERENCES posts(id),
  author TEXT,
  content TEXT NOT NULL
);



INSERT INTO posts (title, content)
VALUES
  ('My First Post', 'This is the content of my very first post. Hello world'),
  ('My second post', 'THis is the content of my second post'),
  ('My Third Post', 'This is my third post ');


  INSERT INTO comments (post_id, author, content)
VALUES
  (1, 'Joe', 'Great first post, keep writing!'),
  (1, 'Mike', 'Looking forward to more content from you.'),
  (2, 'Kieran', 'yes yes'),
  (2, 'Dan', 'keep going'),
  (3, 'Luke', 'ooo nice one.'),
  (3, 'JIm', 'even more ');


SELECT 
  posts.title, 
  posts.content, 
  comments.author, 
  comments.content AS comment
FROM posts
JOIN comments 
  ON comments.post_id = posts.id
WHERE posts.id = 1;
