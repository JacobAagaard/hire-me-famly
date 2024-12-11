import { ChangeEvent, useState } from "react";
import { checkInChildMock, checkoutChildMock } from "../../api";

const ChildCard = (props: any) => {
  const child = props.child;
  const children = props.children;

  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [pickupTime, setPickupTime] = useState<string>("15:30");

  const doCheckIn = async (childId: string, pickupTime: string) => {
    const res = await checkInChildMock(childId, pickupTime, children);
    props.setChildren(res);

    setIsCheckingIn(false);
  };

  const handleClickCheckout = async (childId: string) => {
    const res = await checkoutChildMock(childId, children);
    props.setChildren(res);
    setIsCheckingIn(false);
  };

  const handleChangePickupTime = (event: ChangeEvent<HTMLInputElement>) => {
    const datetime = event.target.value;
    console.log("🚀 ~ handleChangePickupTime ~ datetime:", datetime);

    setPickupTime(datetime);
  };

  return (
    <div
      className="child-container"
      style={{
        backgroundColor: child.checkedIn ? "lightgreen" : "lightpink",
      }}
    >
      {!child?.image?.empty && (
        <img
          className="child-image"
          width={128}
          height={128}
          src={child.image?.small}
          alt={child.name?.fullName}
        />
      )}
      <div>{child.name?.fullName ?? "child.name.fullName"}</div>
      {child.checkedIn ? (
        <div className="pickup-container">
          <input disabled type="time" value={child.pickupTime} />
          <button onClick={(event) => handleClickCheckout(child.childId)}>
            🙋‍♂️ Check-out
          </button>
        </div>
      ) : isCheckingIn ? null : (
        <div className="pickup-container">
          <button onClick={() => setIsCheckingIn(true)}>
            ➡️ Start Check-in
          </button>
        </div>
      )}
      {isCheckingIn ? (
        <span className="pickup-container">
          <button onClick={() => setIsCheckingIn(false)}>❌</button>
          <input
            name="pickupTime"
            type="time"
            min="10:00"
            max="17:00"
            value={pickupTime}
            onChange={(event) => handleChangePickupTime(event)}
          />
          <button onClick={(event) => doCheckIn(child.childId, pickupTime)}>
            ✅
          </button>
        </span>
      ) : null}
    </div>
  );
};

export default ChildCard;
