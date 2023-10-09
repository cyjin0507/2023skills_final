export const LoadImages = [
    [
        {
            image : loadImage('/map/0/1.png'),
            x : 0,
            y : 0
        }
    ],
    [
        {
            image : loadImage('/map/1/2-1.png'),
            x : 0,
            y : 0
        },
        {
            image : loadImage('/map/1/2-2.png'),
            x : 800,
            y : 0
        },
        {
            image : loadImage('/map/1/2-3.png'),
            x : 0,
            y : 800
        },
        {
            image : loadImage('/map/1/2-4.png'),
            x : 800,
            y : 800
        },
    ],
    [
        {
            image : loadImage('/map/2/3-1.png'),
            x : 0,
            y : 0
        },
        {
            image : loadImage('/map/2/3-2.png'),
            x : 800,
            y : 0
        },
        {
            image : loadImage('/map/2/3-3.png'),
            x : 1600,
            y : 0
        },
        {
            image : loadImage('/map/2/3-4.png'),
            x : 2400,
            y : 0
        },
        {
            image : loadImage('/map/2/3-5.png'),
            x : 0,
            y : 800
        },
        {
            image : loadImage('/map/2/3-6.png'),
            x : 800,
            y : 800
        },
        {
            image : loadImage('/map/2/3-7.png'),
            x : 1600,
            y : 800
        },
        {
            image : loadImage('/map/2/3-8.png'),
            x : 2400,
            y : 800
        },
        {
            image : loadImage('/map/2/3-9.png'),
            x : 0,
            y : 1600
        },
        {
            image : loadImage('/map/2/3-10.png'),
            x : 800,
            y : 1600
        },
        {
            image : loadImage('/map/2/3-11.png'),
            x : 1600,
            y : 1600
        },
        {
            image : loadImage('/map/2/3-12.png'),
            x : 2400,
            y : 1600
        },
        {
            image : loadImage('/map/2/3-13.png'),
            x : 0,
            y : 2400
        },
        {
            image : loadImage('/map/2/3-14.png'),
            x : 800,
            y : 2400
        },
        {
            image : loadImage('/map/2/3-15.png'),
            x : 1600,
            y : 2400
        },
        {
            image : loadImage('/map/2/3-16.png'),
            x : 2400,
            y : 2400
        },
    ]
]

function loadImage(src) {
    const image = new Image()
    image.src = src
    return image
}