function getData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let massage = document.getElementById("massage").value;

  if (name == "") {
    return alert("please type your name");
  } else if (email == "") {
    return alert("please type your email");
  } else if (number == "") {
    return alert("please type your phone number");
  } else if (massage == "") {
    return alert("please type your massage");
  }

  const emailDestination = "yahyaagung75@gmail.com";
  // Agar bisa mengakses email yg dituju menggunakan metode create element
  let a = document.createElement("a");
  a.href = `mailto:${emailDestination}?subject=${subject}&body= Halo bang nama saya ${name}, saya ingin ${massage}. Bisakah anda menghubungi saya di ${number}`;
  a.click();

  console.log(name);
  console.log(email);
  console.log(number);
  console.log(subject);
  console.log(subject);
}
