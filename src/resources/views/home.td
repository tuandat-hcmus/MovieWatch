<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    21430{+header.td}
    <h1>Home Page</h1>
    21430{for e in data.arr}
        21430{for a in data.arr}
            21430{if a > 1}
                <span>21430{a}</span>
            {else}
                <span> No </span>
            {\if}
        {\for}
        <hr>
    {\for}
    21430{+footer.td}
</body>
</html>