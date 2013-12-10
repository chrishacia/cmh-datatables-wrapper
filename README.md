cmh-datatables-wrapper
======================

jQuery DataTables Table Wrapper Functionality
<br><br><br><br>

If you use jQuery dataTables frequently enough through out your service/project(s)
Then you know that you often end up with calls to $.dataTables({..}); in various places throughout your code base. Which not only takes up a lot of room. But also is hard to keep track of whats where when and how.
<br><br>
This is my personal answer to this problem. I work on various projects some with or without data tables, but the ones that do use it I tend to have several tables throughout the project using them, and usually on a MVC framework of some sort. So rather than chase the files to find the individual tables and the js that is invoked for them. I basically globalize it. Cause more often than not, the tweaks to them are all solely in the script and not the HTML for me.
<br><br>
So if your looking to bring some form of uniformity to your code base, and some easy to use logic then this is your ideal data tables wrapper.
<br><br>
I working in some functionality I felt was missing as well. Such as pre instantiation and post instantiation functions that you can define the function and have it run at the appropriate times.