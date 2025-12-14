const dsBtn = document.querySelectorAll(".btn");
let inpDiem = document.querySelectorAll(".diemMH");
let inpTsDiem = document.querySelectorAll(".tsDiem");
const selectBox = document.querySelector("#gpaRemain");
const kq = document.getElementById("kqa");
kq.innerText = "Vui lòng nhập điểm";
function updateKq() {
  let ketQua = tinhDiem();
  if (ketQua.diemTong === -1 || ketQua.diemTong === -2) {
    kq.innerText = "Error!";
    return;
  }
  kq.innerText = ketQua.diemTong.toFixed(2);
}
function tinhDiem() {
  inpDiem = document.querySelectorAll(".diemMH");
  inpTsDiem = document.querySelectorAll(".tsDiem");
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
for (let i = 0; i < inpDiem.length; i++) {
  inpDiem[i].addEventListener("input", updateKq);
  if (inpTsDiem[i]) {
    inpTsDiem[i].addEventListener("input", updateKq);
  }
}

function themCotDiem() {
  const place = document.querySelector(".container .inputScore");
  const newDiv = document.createElement("div");
  newDiv.classList.add("subject");
  const newInp1 = document.createElement("input");
  const newInp2 = document.createElement("input");
  newInp1.classList.add("diemMH");
  newInp2.classList.add("tsDiem");
  newInp1.type = "number";
  newInp2.type = "number";
  newInp1.placeholder = "Nhập cột điểm  (0 - 10)";
  newInp2.placeholder = "Nhập % trọng số điểm (0-100)";
  newInp1.addEventListener("input", updateKq);
  newInp2.addEventListener("input", updateKq);
  newDiv.appendChild(newInp1);
  newDiv.appendChild(newInp2);
  place.appendChild(newDiv);
}
function xoaCotDiem() {
  const place = document.querySelector(".container .inputScore");
  const dongCuoi = place.lastElementChild;
  if (dongCuoi) {
    place.removeChild(dongCuoi);
    updateKq();
  } else {
    Swal.fire({
      title: "ERROR!",
      text: "Hết sạch cột điểm, không thể xóa! ",
      icon: "error",
      confirmButtonText: "Chấp nhận",
    });
    return;
  }
}
dsBtn[0].addEventListener("click", themCotDiem);
dsBtn[1].addEventListener("click", xoaCotDiem);
dsBtn[2].addEventListener("click", function () {
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
