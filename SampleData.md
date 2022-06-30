# Structuring the firestore database
The app has really simple database structure. At the root level it has two collections - ``persons``, ``queue``

![Collections image](md_images/docs1.png)

For persons collection, each person document should have a 
- name (string)
- pfpSeed (string)
- tokenNumber (number)

![Person Collections image](md_images/docs2.png)

Now for the queue collection, each document has a
- activeToken (number) set this to 1
- isLive (bool)
- title (string)
- totalBooked (number)
- totalBooking (number)

![Queue Collections image](md_images/docs3.png)

Now you got your database setup for this app to work!