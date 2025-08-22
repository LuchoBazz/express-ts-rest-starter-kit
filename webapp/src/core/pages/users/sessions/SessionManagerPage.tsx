import MainHeader from "../../../../components/MainHeader/MainHeader";
import SessionLimitList from "../../../../components/SessionLimitList/SessionLimitList";

const SessionManagerPage = () => {
  return (
    <div className="flex gap-8 h-screen overflow-hidden">
      <div className="w-1/4">
        <MainHeader />
      </div>

      <div className="w-3/4 m-[30px] overflow-y-auto h-full">
        <div className="m-2 mb-20">
          <SessionLimitList />
        </div>
      </div>
    </div>
  );
};

export default SessionManagerPage;
