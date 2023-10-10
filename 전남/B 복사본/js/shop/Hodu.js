export default class Hodu {
    constructor() {
        this.init()
    }

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        
        const range = document.querySelector("#range")
        
        this.img = new Image()
        
        this.img.crossOrigin = "Anonymous"
        this.img.src = "/walnut-flat.png"
                        
        
        // 두번쓰는 이유 (밑에 distortion에도 똑같은 코드있음) : 안그러면 이미지 엄청 복사됨 이유는 모름
        const size = this.img.height
        this.canvas.width = size;  // 'c' 캔버스의 너비를 'size'로 설정합니다.
        this.canvas.height = size;  // 'c' 캔버스의 높이를 'size'로 설정합니다.       
        
        this.img.onload = () => {
            range.max = this.img.width + 15
            range.addEventListener('input', (e) => this.distortion(e.currentTarget.value))                                
            this.distortion(15) // 여기 때문에 중복되는 코드 쓰는거임 처음 구 띄울라고
        }

    }

    distortion(value) {
        const size = this.img.height
        this.canvas.width = size;  // 'c' 캔버스의 너비를 'size'로 설정합니다.
        this.canvas.height = size;
        const cx = value;
        const cy = this.canvas.height / 2;


        const zoom = 1.2

        const imgY = cy - this.img.offsetTop - .5 * size / zoom
        this.ctx.drawImage(
            this.img,
            cx - this.img.offsetLeft + .81 * size / zoom,
            imgY,
            size / zoom,
            size / zoom,
            0,
            0,
            size,
            size
        );
        this.ctx.drawImage(
            this.img,
            cx - this.img.offsetLeft - 2 * size / zoom,
            imgY,
            size / zoom,
            size / zoom,
            0,
            0,
            size,
            size
        );

        let imgData = this.ctx.getImageData(0, 0, size, size);  // 캔버스에서 이미지 데이터를 가져옵니다.
        const pixels = imgData.data;  // 이미지 데이터의 픽셀 배열을 가져옵니다.
        const pixelsCopy = []
        let index = 0, h = size, w = size;

        for (let i = 0; i <= pixels.length; i += 4) {  // 픽셀 데이터를 복사합니다.
            pixelsCopy[index] = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
            index++;
        }

        let result = this.fisheye(pixelsCopy, w, h);  // 'fisheye' 함수를 사용하여 피쉬아이 효과를 적용합니다.

        for (let i = 0; i < result.length; i++) {  // 효과가 적용된 픽셀 데이터를 이미지 데이터에 적용합니다.
            index = 4 * i;
            if (result[i] != undefined) {
                pixels[index + 0] = result[i][0];
                pixels[index + 1] = result[i][1];
                pixels[index + 2] = result[i][2];
                pixels[index + 3] = result[i][3];
            }
        }

        this.ctx.putImageData(imgData, 0, 0);  // 이미지 데이터를 캔버스에 그립니다.
    }

    fisheye(srcpixels, width, height) {

        const dstpixels = srcpixels.slice();  // 픽셀 배열을 복사합니다.

        for (let y = 0; y < height; y++) {

            const ny = ((2 * y) / height) - 1;  // 픽셀 위치를 정규화합니다.
            const ny2 = ny * ny;

            for (let x = 0; x < width; x++) {

                const nx = ((2 * x) / width) - 1;  // 픽셀 위치를 정규화합니다.
                const nx2 = nx * nx;
                const r = Math.sqrt(nx2 + ny2);  // 픽셀까지의 거리를 계산합니다.

                if (0.0 <= r && r <= 1.0) {  // 거리가 0에서 1 사이인 픽셀에 대해 피쉬아이 효과를 적용합니다.
                    let nr = Math.sqrt(1.0 - r * r);  // 변환된 거리를 계산합니다.
                    nr = (r + (1.0 - nr)) / 2.0;  // 변환된 거리를 보정합니다.

                    if (nr <= 1.0) {

                        const theta = Math.atan2(ny, nx);  // 각도를 계산합니다.
                        const nxn = nr * Math.cos(theta);  // 새로운 X 좌표를 계산합니다.
                        const nyn = nr * Math.sin(theta);  // 새로운 Y 좌표를 계산합니다.
                        const x2 = parseInt(((nxn + 1) * width) / 2);  // 변환된 좌표를 계산합니다.
                        const y2 = parseInt(((nyn + 1) * height) / 2);  // 변환된 좌표를 계산합니다.
                        const srcpos = parseInt(y2 * width + x2);  // 원본 이미지에서 해당 좌표를 찾습니다.

                        if (srcpos >= 0 & srcpos < width * height) {
                            dstpixels[parseInt(y * width + x)] = srcpixels[srcpos];  // 변환된 좌표에 해당하는 원본 픽셀을 대체합니다.
                        }
                    }
                }
            }
        }
        return dstpixels;  // 변환된 픽셀 배열을 반환합니다.
    }

}