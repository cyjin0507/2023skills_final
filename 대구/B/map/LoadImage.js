export const Data = [
    [
        {
            "img" : loadImage("/image/1/1.png"),
            "x" : 0,
            "y" : 0
        }
    ],
    [
        {
            "img" : loadImage("/image/2/2-1.png"),
            "x" : 0,
            "y" : 0
        },
        {
            "img" : loadImage("/image/2/2-2.png"),
            "x" : 800,
            "y" : 0
        },
        {
            "img" : loadImage("/image/2/2-3.png"),
            "x" : 0,
            "y" : 800
        },
        {
            "img" : loadImage("/image/2/2-4.png"),
            "x" : 800,
            "y" : 800
        }
    ],
    [
        {
            "img" : loadImage("/image/3/3-1.png"),
            "x" : 0,
            "y" : 0
        },
        {
            "img" : loadImage("/image/3/3-2.png"),
            "x" : 800,
            "y" : 0
        },
        {
            "img" : loadImage("/image/3/3-3.png"),
            "x" : 1600,
            "y" : 0
        },
        {
            "img" : loadImage("/image/3/3-4.png"),
            "x" : 2400,
            "y" : 0
        },
        {
            "img" : loadImage("/image/3/3-5.png"),
            "x" : 0,
            "y" : 800
        },
        {
            "img" : loadImage("/image/3/3-6.png"),
            "x" : 800,
            "y" : 800
        },
        {
            "img" : loadImage("/image/3/3-7.png"),
            "x" : 1600,
            "y" : 800
        },
        {
            "img" : loadImage("/image/3/3-8.png"),
            "x" : 2400,
            "y" : 800
        },
        {
            "img" : loadImage("/image/3/3-9.png"),
            "x" : 0,
            "y" : 1600
        },
        {
            "img" : loadImage("/image/3/3-10.png"),
            "x" : 800,
            "y" : 1600
        },
        {
            "img" : loadImage("/image/3/3-11.png"),
            "x" : 1600,
            "y" : 1600
        },
        {
            "img" : loadImage("/image/3/3-12.png"),
            "x" : 2400,
            "y" : 1600
        },
        {
            "img" : loadImage("/image/3/3-13.png"),
            "x" : 0,
            "y" : 2400
        },
        {
            "img" : loadImage("/image/3/3-14.png"),
            "x" : 800,
            "y" : 2400
        },
        {
            "img" : loadImage("/image/3/3-15.png"),
            "x" : 1600,
            "y" : 2400
        },
        {
            "img" : loadImage("/image/3/3-16.png"),
            "x" : 2400,
            "y" : 2400
        },
    ]
]

function loadImage(src) {
    const img = new Image()
    img.src = src
    return img
    // img.onload = () => {
    // }
}