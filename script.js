const inpDiem = document.querySelectorAll(".diemMH");
const inpTsDiem = document.querySelectorAll(".tsDiem");
const dsBtn = document.querySelectorAll(".Btn");
const selectBox = document.querySelector("#gpaRemain");
function tinhDiem() {
  let tongTsDiem = 0;
  let tongTS = 0;
  for (let i = 0; i < inpDiem.length; i++) {
    if (inpDiem[i].valueAsNumber > 10 || inpDiem[i].valueAsNumber < 0) {
      return {
        diemTong: -1,
        tongTrongSo: -1,
      };
    }
    if (inpTsDiem[i].valueAsNumber > 100 || inpTsDiem[i].valueAsNumber < 0) {
      return {
        diemTong: -2,
        tongTrongSo: -2,
      };
    }
  }
  for (let i = 0; i < inpDiem.length; i++) {
    if (isNaN(inpDiem[i].valueAsNumber) || isNaN(inpTsDiem[i].valueAsNumber))
      continue;
    tongTsDiem += (inpDiem[i].valueAsNumber * inpTsDiem[i].valueAsNumber) / 100;
    tongTS += inpTsDiem[i].valueAsNumber;
  }
  return {
    diemTong: tongTsDiem,
    tongTrongSo: tongTS,
  };
}

dsBtn[0].addEventListener("click", function () {
  let msg = "";
  let msg1 = "";
  let kqua = tinhDiem();
  if (kqua.diemTong == -1) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập điểm môn học từ 0 tới 10 ",
      icon: "error",
      confirmButtonText: "Sửa lại",
    });
    return;
  }
  if (kqua.diemTong == -2) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập trọng số điểm từ 0 tới 100 ",
      icon: "error",
      confirmButtonText: "Sửa lại",
    });
    return;
  }
  let diemHT = kqua.diemTong;
  let trongsoHT = kqua.tongTrongSo;
  if (diemHT == 0) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập đầy đủ cột điểm để tính!",
      icon: "error",
      confirmButtonText: "Nhập lại",
    });
    return;
  }
  if (trongsoHT <= 99) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập đủ 100% trọng số điểm để tính!",
      icon: "error",
      confirmButtonText: "Nhập lại",
    });
    return;
  }
  if (diemHT <= 10 && diemHT >= 9.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 4.0";
    msg1 += "A+";
  } else if (diemHT < 9.5 && diemHT >= 8.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 4.0";
    msg1 += "A";
  } else if (diemHT < 8.5 && diemHT >= 8.0) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 3.65";
    msg1 += "A-";
  } else if (diemHT < 8.0 && diemHT >= 7.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 3.33";
    msg1 += "B+";
  } else if (diemHT < 7.5 && diemHT >= 7.0) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 3.0";
    msg1 += "B";
  } else if (diemHT < 7.0 && diemHT >= 6.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 2.65";
    msg1 += "B-";
  } else if (diemHT < 6.5 && diemHT >= 6.0) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 2.33";
    msg1 += "C+";
  } else if (diemHT < 6.0 && diemHT >= 5.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 2.0";
    msg1 += "C";
  } else if (diemHT < 5.5 && diemHT >= 4.5) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 1.65";
    msg1 += "C-";
  } else if (diemHT < 4.5 && diemHT >= 4) {
    msg += "Điểm GPA môn học hiện tại của bạn là: 1.0";
    msg1 += "D";
  } else {
    Swal.fire({
      title: "BẠN ĐÃ FAIL MÔN HỌC NÀY",
      imageUrl: "cryingIcon.webp",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Sad Face image",
      confirmButtonText: "OK",
    });
    return;
  }
  Swal.fire({
    title: "Môn học này bạn được " + msg1,
    text: msg,
    imageUrl: "smileIcon.jpg",
    imageWidth: 350,
    imageHeight: 200,
    imageAlt: "Smile Face image",
    confirmButtonText: "OK",
  });
});
dsBtn[1].addEventListener("click", function () {
  let kQua = tinhDiem();
  if (kQua.diemTong == -1) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập điểm môn học từ 0 tới 10 ",
      icon: "error",
      confirmButtonText: "Sửa lại",
    });
    return;
  }
  if (kQua.diemTong == -2) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng nhập trọng số điểm từ 0 tới 100 ",
      icon: "error",
      confirmButtonText: "Sửa lại",
    });
    return;
  }
  let diemHT = kQua.diemTong;
  let tsHT = kQua.tongTrongSo;
  if (tsHT >= 100) {
    Swal.fire({
      title: "Đủ 100% rồi!",
      text: "Bạn đã nhập đủ 100% trọng số, không còn phần nào để tính nữa ",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }
  let gpaMuonDat = parseFloat(selectBox.value);
  if (gpaMuonDat == -1) {
    Swal.fire({
      title: "ERROR!",
      text: "Vui lòng chọn GPA phù hợp để tính!",
      icon: "error",
      confirmButtonText: "Chọn lại",
    });
    return;
  }
  let tsRemain = 100 - tsHT;
  let diemRemain = (gpaMuonDat - diemHT) / (tsRemain / 100);
  diemRemain = parseFloat(diemRemain.toFixed(2));
  let txtSelect = selectBox.options[selectBox.selectedIndex];
  if (diemRemain > 10) {
    Swal.fire({
      title: "Rất tiếc!",
      text:
        "Dù làm được 10 điểm bạn vẫn không thể đạt được GPA " + txtSelect.text,
      imageUrl: "cryingIcon.webp",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Sad Face image",
      confirmButtonText: "OK",
    });
  } else if (diemRemain <= 0) {
    Swal.fire({
      title: "Chúc mừng!",
      text: "Bạn đã đạt được GPA " + txtSelect.text + " sẵn rồi!",
      imageUrl: "smileIcon.jpg",
      imageWidth: 350,
      imageHeight: 200,
      imageAlt: "Smile Face image",
      confirmButtonText: "OK",
    });
  } else {
    Swal.fire({
      title:
        "Bạn cần hoàn thành các cột còn lại ít nhất " +
        diemRemain +
        " điểm để được " +
        txtSelect.text,
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
});
