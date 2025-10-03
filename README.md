For this project had to build a blog with a comment form in order to do this I chose to keep it a very basic blog with some pre-existing posts for the user to comment on,
in order to do this I first created my database with a table for the posts and one for the comments I then connected the the 2 in a one to many relation between the posts and the comments. this allows for each individual post to have their own comments.

I then moved on to creating my app first I wanted the page to have some navigation and multiple areas for the user to move through as such I created the homepage with a nav bar in the header with links that allow the user to move through the app from home to posts and back, once this was implemented I moved on to creating my form I opted to create the form directly in the [postId] as this seemed the more straightforward approach once I had the form implemented. I set about setting it up so the user can select a post and will be moved to a page for that post and are able to see the content of the post and all its comments then the form to add a new comment is located at the bottom of the page.

from there I went back to the posts page where the list of posts would be displayed and implemented the feature to have the posts sorted in ascending or descending alphabetical order.

after I had ensured that the form and navigation worked I moved on to implementing a comments delete button. as the comments and the form are located in the same page.js I also coded the delete button functionality directly in the page.js as well. as the user is only able to create new comments I made it so the delete function only applies to the comments.

while I had a redirect to see a post once you had created a comment this wasn't clear to the user as it was in the post you where commenting on as such there was no clear change, in order to further build out the page and have a more meaningful redirect I created another form page which exists one its own the users can navigate to it through nav bar and be able to add a comment to a post from there and then once they submit the form they will be redirected to the post they have just added a new comment on.

during this project I feel that while challenging I was able to achieve each requirement as of me in the brief, thankfully I had the work I did last week and during the week which was a great help in this project I did still have some struggle with getting the form working how ever after looking at the code I had created in previous weeks and then wating some YouTube videos on forms in next.jS with Server Actions and Revalidating Data It help me to implement a working form form there I feel that the project progressed at a smooth pace.

resources

https://www.youtube.com/watch?v=dDpZfOQBMaU
https://www.youtube.com/watch?v=xWFbnrTap3M
https://nextjs.org/docs/app/guides/forms?utm_source=chatgpt.com
