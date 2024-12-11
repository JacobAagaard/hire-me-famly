import {
  API_ACCESS_TOKEN,
  API_BASE_URL,
  API_GROUP_ID,
  API_INSTITUTION_ID,
} from "./environment";

export const fetchChildren = async () => {
  const response = await fetch(
    `${API_BASE_URL}/daycare/tablet/group?accessToken=${API_ACCESS_TOKEN}&groupId=${API_GROUP_ID}&institutionId=${API_INSTITUTION_ID}`
  );

  if (response.status >= 200 && response.status < 299) {
    return response.json();
  } else {
    return null;
  }
};

export const checkInChild = async (childId: string, pickupTime: string) => {
console.log("🚀 ~ checkInChild ~ childId:", childId)
  const response = await fetch(
    `${API_BASE_URL}/v2/children/${childId}/checkins`,
    {
      method: "POST",
      body: JSON.stringify({
        accessToken: API_ACCESS_TOKEN,
        pickupTime: pickupTime,
      }),
    }
  );
  if (response.status >= 200 && response.status < 299) {
    return response.json();
  } else {
    return null;
  }
};

export const checkOutChild = async (childId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/v2/children/${childId}/checkout`,
    {
      method: "POST",
      body: JSON.stringify({ accessToken: API_ACCESS_TOKEN }),
    }
  );

  if (response.status >= 200 && response.status < 299) {
    return response.json();
  } else {
    return null;
  }
};

export const checkInChildMock = async (childId: string, pickupTime: string, children: []) => {
  const newChildren = children.map((child: any) => {
    if(child.childId === childId){
      child.checkedIn = true;
      child.pickupTime = pickupTime;
    }
    return child;
  });
  return newChildren;
}


export const checkoutChildMock = async (childId: string, children: []) => {
  const newChildren = children.map((child: any) => {
    if(child.childId === childId){
      child.checkedIn = false;
      child.pickupTime = null;
    }
    return child;
  });
  return newChildren;
}
