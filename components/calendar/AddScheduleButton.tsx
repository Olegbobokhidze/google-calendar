"use client";

type Props = {
  isSideCalendar: boolean;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddScheduleButton: React.FC<Props> = ({
  isSideCalendar,
  isOpenModal,
  setIsOpenModal,
}) => {
  return (
    <div
      className={`fixed left-0 top-[60px] rounded-full z-50 flex h-[70px] items-center bg-white ${
        isSideCalendar
          ? "w-fit justify-start ml-5"
          : "w-fit justify-center ml-5"
      }`}
    >
      <button
        className={`h-14 w-14 rounded-full border bg-white hover:shadow-xl ${isSideCalendar && "hidden"}`}
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 0 24 24"
          width="36px"
          fill="#222222"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>
      <button
        className={`flex h-14 w-32 items-center rounded-full border bg-white px-2 shadow-md hover:shadow-xl ${!isSideCalendar && "hidden"}`}
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 0 24 24"
          width="36px"
          fill="#222222"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span className="ml-3">დაამატე</span>
      </button>
    </div>
  );
};
