// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //CREATE A NEW DATE OBJECT
  const date = new dayjs();

  //GET THE DAY WRAPPER AT THE TOP OF THE PAGE
  const currentDayWrapper = document.getElementById("currentDay");
  //SET INER HTML TO FORMATTED DATE DAY NAME, DAY #, MONTH NAME, YEAR
  currentDayWrapper.innerHTML = date.format("dddd, MMM d, YYYY");

  //FORMAT THE DATE TO GET THE HOUR
  const currentHour = Number(date.format("H"));
  //GET THE PARENT CONTAINER FOR ALL THE HOURS
  const hourWrapper = document.getElementById("hourContainer");
  //ALL THE CLASSES THE HOUR DIVS CAN HAVE
  const allClasses = ["past", "present", "future"];

  for (let i = 0; i < hourWrapper.children.length; i++) {
    //REMOVE ANY CLASSES THE WRAPS MAY ALREADY HAVE
    hourWrapper.children[i].classList.remove(...allClasses);

    //GET THE HOUR NUMBER FROM THE WRAP ID
    let elementCurrentHour = Number(
      hourWrapper.children[i].id.split("hour-")[1]
    );

    //SWITCH TRUE SO IT RUNS ONE OF THESE CHECKS EVERY TIME
    switch (true) {
      //IF THE ELEMENT HOUR IS GREATER THAN THE DATE HOUR, THEN ADD FUTURE CLASS
      case elementCurrentHour > currentHour:
        hourWrapper.children[i].classList.add("future");
        break;
      //IF THE ELEMENT HOUR IS LESS THAN THE DATE HOUR, THEN ADD PAST CLASS
      case elementCurrentHour < currentHour:
        hourWrapper.children[i].classList.add("past");
        break;
      //IF THE ELEMENT HOUR IS THE SAME AS THE DATE HOUR, THEN ADD PRESENT CLASS
      case elementCurrentHour == currentHour:
        hourWrapper.children[i].classList.add("present");
        break;
    }

    //SET INNERHTML OF TEXTBOX TO THE SESSIONSTORAGE ITEM I OR AN EMPTY STRING
    hourWrapper.children[i].children[1].innerHTML = sessionStorage.getItem(i)
      ? sessionStorage.getItem(i)
      : "";

    //ADD NEW EVENT LISTENER TO THE BUTTON ELEMENT
    hourWrapper.children[i].children[2].addEventListener("click", () => {
      //SET SESSION STORAGE VARIABLE INDEX I TO THE VALUE OF THE TEXTBOX
      sessionStorage.setItem(i, hourWrapper.children[i].children[1].value);

      //IF THE USER ENTERED A BLANK STRING OR A BUNCH OF SPACES
      if (sessionStorage.getItem(i).trim() === "") {
        //REMOVE  ITEM FROM SESSION STORAGE
        sessionStorage.removeItem(i);
      }
    });
  }
});
