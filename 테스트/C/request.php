<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script>
        window.onload = async () => {
            const processTour = await $.getJSON('/process/tour/guide')
            const requestList = await $.getJSON('/myTour')

            if(processTour.length > 0) {
                new Tour("guide")
            } else {
                
                requestList.forEach(x=> {

                })
            }
        }

    </script>
</body>
</html>