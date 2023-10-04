<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script>

        window.onload = () => {
            $('').hide()
            this.init()
        }

        async function init() {
            const processTour = await $.getJSON('/process/tour/user')
            if(processTour.length > 0) {
                new Tour("user")

                if(processTour[0].accept == 3) {
                    $('').show()
                }
            } else {

            }
        }

    </script>
    
</body>
</html>