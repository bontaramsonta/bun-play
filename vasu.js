function shouldLike(values, constraints) {
  if (values["verified"] === "false") {
    return false;
  }

  for (const key in constraints) {
    const desiredValue = constraints[key];
    let actualValue = values[key];

    if (key === "height") {
      actualValue = parseInt(actualValue.split(" ")[0]);
    }

    if (actualValue === undefined) {
      console.log(key + " not available in this profile");
      continue;
    } else {
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

const req = {
  "verified": "true",
  "height": "168 cm",
  "exercise": "Sometimes",
  "education": "In college",
  "drinking": "Socially",
  "smoking": "Regularly",
  "gender": "Woman",
  "intentions": "Something casual",
  "familyPlans": "Want someday",
  "starSign": "Aries",
  "religion": "Hindu"
};

const minHeight = 160;
const maxHeight = 175;

const constraints = {
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

const result = shouldLike(req, constraints)
console.log(result)