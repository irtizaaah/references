# HTML
## Boilerplate
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
	<script src="index.js"></script>
  </body>
</html>
```
## Semantic tags vs. Div tag
Semantic tags (Header, nav, main, section, aside, footer...) describe each part of the page (semantic markup). 
Divs can be used for styling, and structure (presentation markup).
```
<!DOCTYPE html> <!-- render page using html 5 specification -->
    <html lang="en"> <!-- hyper text markup language -->
    <head> <!--data connected to document-->
        <!-- meta data -->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- relationships with other files-->
        <link rel="stylesheet" href="styles.css">
        <link rel="icon" href="icon.ico">
        
        <!--  scripting language -->
        <script src="./app.js"></script>
        
        <title>Document Title</title>
    </head>
    <body>
        <nav> 
            <ul> <!-- unordered list -->
                <li>home</li>
                <li>about</li>
                <li>more</li>
            </ul>
        </nav>

        <aside>
            <ol> <!-- ordered list -->
                <li>intro</li>
                <li>body</li>
                <li>conclusion item</li>
            </ol>
        </aside>

        <main>
            <h1>John Doe</h1>
            <p>This is John Doe's page</p>

            <section>
                <h2>Biography</h2>
                <article>
                    <h3>Early Life</h3>
                    <p>Paragraph</p>
                    <a href="google.com">link</a> <!-- anchor -->
                </article>
            </section>

            <section>
                <h2>Highlights</h2>
                <img src="https://ahrefs.com/blog/wp-content/uploads/2021/05/backlinks.png" alt="link image">
            </section>
        </main>

    </body>
</html>
```
