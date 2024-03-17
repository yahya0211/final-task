// inisiasi array kosong
let dataProjects = [];

// buat function object

function addProject(event) {
  event.preventDefault();

  let projectTittle = document.getElementById("project-id").value;
  let descriptionContent = document.getElementById("desc").value;
  let dateContentStart = new Date(document.getElementById("date-start").value);
  let dateContentEnd = new Date(document.getElementById("date-end").value);
  let nodeChecked = document.getElementById("nodejs").checked;
  let reactChecked = document.getElementById("reactjs").checked;
  let nextChecked = document.getElementById("nextjs").checked;
  let typeChecked = document.getElementById("typescript").checked;

  let postAt = new Date();

  // if (nodeChecked === "checked") {
  //   nodeChecked.style.display = "block";
  // } else if (reactChecked === "checked") {
  //   reactChecked.style.display = "block";
  // } else if (nextChecked === "checked") {
  //   reactChecked.style.display = "block";
  // } else if (typeChecked === "checked") {
  //   typeChecked.style.display = `block`;
  // } else {
  //   return;
  // }
  let dataProject = {
    dateContentStart,
    dateContentEnd,
    projectTittle,
    nodeChecked,
    nextChecked,
    reactChecked,
    typeChecked,
    postAt,
    descriptionContent,
  };

  // if (projectTittle == "") {
  //   return alert("please type your project");
  // } else if (dateContentStart == "") {
  //   return alert("please insert your start date project");
  // } else if (dateContentEnd == "") {
  //   return alert("please insert your end date project");
  // } else if (descriptionContent == "") {
  //   return alert("please type your description project");
  // }

  dataProjects.push(dataProject);
  console.log(dataProjects);

  renderProject();
}

function renderProject() {
  document.getElementById("container-id").innerHTML = "";

  for (let i = 0; i < dataProjects.length; i++) {
    let durationString = getDurationDate(dataProjects[i].postAt, dataProjects[i].dateContentStart, dataProjects[i].dateContentEnd);
    document.getElementById("container-id").innerHTML += `
    
    `;
  }
}

function getDurationDate(postAt, dateContentStart, dateContentEnd) {
  let distanceDuration = dateContentEnd - dateContentStart;

  // Format milisecond to distance day

  let yearMonth = 12;
  let monthWeek = 4;
  let weekDay = 7;
  let dayHour = 24;
  let hourMinute = 60;
  let minuteSecond = 60;
  let secondMilisecond = 1000;

  let oneYear = yearMonth * monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneMonth = monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneWeek = weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneDay = dayHour * hourMinute * minuteSecond * secondMilisecond;

  let durationYear = Math.floor(distanceDuration / oneYear);
  let durationMonth = Math.floor(distanceDuration / oneMonth);
  let durationWeek = Math.floor(distanceDuration / oneWeek);
  let durationDay = Math.floor(distanceDuration / oneDay);

  if (durationDay <= 7) {
    return `${durationDay} day`;
  } else if (durationDay <= 7) {
    return `${durationWeek} Week`;
  } else if (durationWeek <= 4) {
    return `${durationMonth} Month`;
  } else if (durationMonth <= 12) {
    return `${durationMonth} Month`;
  } else {
    return `${durationYear} Year`;
  }
}
