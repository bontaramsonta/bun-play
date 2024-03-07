// globals
let record = [];
let inter = null;

let minHeight = 160;
let maxHeight = 175;
let maxLikes = 50;
let constraints = {
  "drinking": {
    "type": "no",
    "values": ["Sober", "Never"]
  },
  "height": {
    "type": "yes",
    "values": Array.from({ length: maxHeight - minHeight + 1 }, (_, i) => minHeight + i)
  },
  "gender": {
    "type": "yes",
    "values": ["Woman"]
  },
  "intentions": {
    "type": "no",
    "values": ["Marriage", "Relationship"]
  },
  "religion": {
    "type": "no",
    "values": ["Muslim"]
  }
};
let shouldLike = (values, constraints) => {
  if (values["verified"] === "false") {
    return false;
  }

  for (const key in constraints) {
    if (maxLikes < 0) {
      console.log("achived maximum simp!!!")
      return;
    }
    const desiredValue = constraints[key];
    let actualValue = values[key];

    if (key === "height") {
      console.log({ actualValue, key })
      actualValue = parseInt(actualValue.split(" ")[0]);
    }

    if (actualValue === undefined) {
      console.log(key + " not available in this profile");
      continue;
    }
    else {
      if (desiredValue.type === "no") {
        const valuesRange = desiredValue.values;
        if (valuesRange.includes(actualValue)) {
          return false;
        }
      } else {
        const valuesRange = desiredValue.values;
        if (valuesRange.includes(actualValue)) {
          continue;
        } else {
          return false;
        }
      }
    }
  }

  return true;
}

let do_it = async () => {
  let details = {};
  let name = document.querySelector(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div:nth-child(1) > article > div.encounters-album__stories-container > div:nth-child(1) > article > div:nth-child(2) > section > header > h1 > span.encounters-story-profile__name"
  )?.innerText;
  details["name"] = name;
  console.info("got name");
  console.log(name)
  let img = document.querySelector(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div:nth-child(1) > article > div.encounters-album__stories-container > div:nth-child(1) > article > div:nth-child(1) > div > figure > picture > img"
  )?.src;
  details["image"] = img;
  console.info("got image");
  // photo verified
  let verified =
    document.querySelector(
      "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div:nth-child(1) > article > div.encounters-album__stories-container > div:nth-child(1) > article > div:nth-child(2) > section > header > div > div.encounters-story-profile__verification-text"
    )?.innerText === "Photo\nverified";
  details["verified"] = verified;
  console.info("got verified text");
  // buttons
  let scrolldown = document.querySelector(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div:nth-child(1) > article > div.encounters-album__nav > div.encounters-album__nav-item.encounters-album__nav-item--next"
  );
  // scroll down times 1
  scrolldown.click();
  await new Promise((r) => setTimeout(r, 1000)); // sleep 1s
  console.info("scrolled down");
  // get requirements
  // run vasu filter
  let likeBtn = document.querySelector(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div.encounters-user__controls > div > div:nth-child(2) > div > div:nth-child(3) > div > div.encounters-action__icon > span"
  );
  let passBtn = document.querySelector(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div.encounters-user__controls > div > div:nth-child(2) > div > div:nth-child(1) > div > div.encounters-action__icon > span"
  );
  // like or pass
  let requirementsNodeList = document.querySelectorAll(
    "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div:nth-child(1) > article > div.encounters-album__stories-container > div:nth-child(2) > article > div > section > div > ul > li > div"
  );
  requirementsNodeList.forEach((e) => {
    let k = e.children[0].children[0].src
      .split("profileChips_dating_")[1]
      .replace("v2.png", "");
    let value = e.children[0].children[0].alt;
    details[k] = value;
  });
  console.log("got details", details);
  // call vasu filter
  const like = shouldLike(details, constraints)
  if (like) {
    console.log(name, "liked", details);
    maxLikes -= 1;
    likeBtn.click();
  } else {
    console.log(name, "pass", details);
    passBtn.click();
  }
  record.push({ verdict: like, details });
};

let start = () => {
  if (inter !== null) {
    console.log("already running")
  } else {
    inter = setInterval(do_it, 3000);
  }
}

let stop = () => {
  if (inter !== null) {
    clearInterval(inter)
    inter = null
  } else {
    console.log("already stopped")
  }
}
