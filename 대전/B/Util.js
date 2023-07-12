function getImageFiles(e) {
    const uploadFiles = [];
  const files = e.currentTarget.files;
  const imagePreview = document.querySelector('#slide-img-list');

  if ([...files].length > 1) {
    alert('이미지는 1개만 업로드가 가능합니다.');
    return;
  }

  // 파일 타입 검사
  [...files].forEach(file => {
    if (!file.type.match("image/.*")) {
      alert('이미지 파일만 업로드가 가능합니다.');
      url = false
      return
    }

    // 파일 갯수 검사
    if ([...files].length <= 1) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
            url = e.target.result
        };
        reader.readAsDataURL(file);
    }
  });
}

let url = ""

